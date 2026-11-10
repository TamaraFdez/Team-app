import jwt from 'jsonwebtoken'
import db from '../config/database.js'
import { COOKIE_NAME } from '../config/auth.js'

export async function verificarToken(req, res, next) {
  const token = req.cookies[COOKIE_NAME]

  if (!token) {
    return res.status(401).json({
      mensaje: 'No has iniciado sesión'
    })
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET no está configurado')

    return res.status(500).json({
      mensaje: 'Error de configuración del servidor'
    })
  }

  let datosToken

  try {
    datosToken = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return res.status(401).json({
      mensaje: 'La sesión ha caducado o no es válida'
    })
  }

  try {
    const [usuarios] = await db.execute(
      `SELECT id, nombre_usuario, alineamiento, avatar
       FROM usuario
       WHERE id = ?`,
      [datosToken.sub]
    )

    if (usuarios.length === 0) {
      return res.status(401).json({
        mensaje: 'El usuario ya no existe'
      })
    }

    req.user = {
      id: usuarios[0].id,
      nombreUsuario: usuarios[0].nombre_usuario,
      alineamiento: usuarios[0].alineamiento,
      avatar: usuarios[0].avatar
    }

    next()

  } catch (error) {
    console.error('Error verificando usuario:', error)

    return res.status(500).json({
      mensaje: 'Error al comprobar la sesión'
    })
  }
}
