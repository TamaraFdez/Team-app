import db from '../config/database.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookieOptions, COOKIE_NAME } from '../config/auth.js'
import { AVATARES } from '../config/avatares.js'

const DURACION_TOKEN = 24 * 60 * 60 * 1000

const alineamientosValidos = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil'
]

// Generar JWT y establecer la cookie
function crearSesion(usuario, res) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no está configurado')
  }

  const token = jwt.sign(
    { nombreUsuario: usuario.nombre_usuario },
    process.env.JWT_SECRET,
    {
      subject: String(usuario.id),
      expiresIn: '1d'
    }
  )

  res.cookie(COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge: DURACION_TOKEN
  })
}

// Registrar usuario
export async function registrar(req, res) {
  try {
    const { nombreUsuario, contrasena, alineamiento, avatar } = req.body

    if (!nombreUsuario || !contrasena || !alineamiento) {
      return res.status(400).json({
        mensaje: 'Faltan campos obligatorios'
      })
    }
    if (typeof nombreUsuario !== 'string' || typeof contrasena !== 'string' || typeof alineamiento !== 'string') {
      return res.status(400).json({ mensaje: 'Formato de datos no válido' })
    }

    if (contrasena.length > 72) {
      return res.status(400).json({ mensaje: 'La contraseña no puede superar los 72 caracteres' })
    }

    const nombre = nombreUsuario.trim()

    if (nombre.length < 3 || nombre.length > 50) {
      return res.status(400).json({
        mensaje: 'El nombre de usuario debe tener entre 3 y 50 caracteres'
      })
    }

    if (contrasena.length < 8) {
      return res.status(400).json({
        mensaje: 'La contraseña debe tener al menos 8 caracteres'
      })
    }

    if (!alineamientosValidos.includes(alineamiento)) {
      return res.status(400).json({
        mensaje: 'El alineamiento no es válido'
      })
    }

    // El avatar es opcional: si no se elige, se guarda null
    const avatarFinal = avatar ?? null

    if (avatarFinal !== null && !AVATARES.includes(avatarFinal)) {
      return res.status(400).json({ mensaje: 'El avatar no es válido' })
    }

    const hash = await bcrypt.hash(contrasena, 12)

    const [resultado] = await db.execute(
      `INSERT INTO usuario
        (nombre_usuario, hash_contrasena, alineamiento, avatar)
       VALUES (?, ?, ?, ?)`,
      [nombre, hash, alineamiento, avatarFinal]
    )

    const usuario = {
      id: resultado.insertId,
      nombre_usuario: nombre
    }

    crearSesion(usuario, res)

    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: {
        id: usuario.id,
        nombreUsuario: usuario.nombre_usuario,
        alineamiento,
        avatar: avatarFinal
      }
    })

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        mensaje: 'Ese nombre de usuario ya está registrado'
      })
    }

    console.error('Error al registrar usuario:', error)

    return res.status(500).json({
      mensaje: 'Error al registrar el usuario'
    })
  }
}

// Iniciar sesión
export async function iniciarSesion(req, res) {
  try {
    const { nombreUsuario, contrasena } = req.body

    if (!nombreUsuario || !contrasena) {
      return res.status(400).json({
        mensaje: 'Introduce el nombre de usuario y la contraseña'
      })
    }

    if (typeof nombreUsuario !== 'string' || typeof contrasena !== 'string') {
      return res.status(400).json({ mensaje: 'Formato de datos no válido' })
    }

    const [usuarios] = await db.execute(
      `SELECT id, nombre_usuario, hash_contrasena,
              alineamiento, avatar
       FROM usuario
       WHERE nombre_usuario = ?`,
      [nombreUsuario.trim()]
    )

    if (usuarios.length === 0) {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas'
      })
    }

    const usuario = usuarios[0]

    const contrasenaCorrecta = await bcrypt.compare(
      contrasena,
      usuario.hash_contrasena
    )

    if (!contrasenaCorrecta) {
      return res.status(401).json({
        mensaje: 'Credenciales incorrectas'
      })
    }

    crearSesion(usuario, res)

    return res.json({
      mensaje: 'Sesión iniciada correctamente',
      usuario: {
        id: usuario.id,
        nombreUsuario: usuario.nombre_usuario,
        alineamiento: usuario.alineamiento,
        avatar: usuario.avatar
      }
    })

  } catch (error) {
    console.error('Error al iniciar sesión:', error)

    return res.status(500).json({
      mensaje: 'Error al iniciar sesión'
    })
  }
}

// Consultar usuario autenticado
export function obtenerSesion(req, res) {
  return res.json({
    usuario: req.user
  })
}

// Cerrar sesión
export function cerrarSesion(req, res) {
  res.clearCookie(COOKIE_NAME, cookieOptions)

  return res.json({
    mensaje: 'Sesión cerrada correctamente'
  })
}
