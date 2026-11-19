import db from '../config/database.js'

const ESTADOS_RECLUTA = ['pendiente', 'aceptado', 'rechazado']
const RESULTADOS_MISION = ['Pendiente', 'Catástrofe', 'Misión fallida', 'Regulinchi', 'Terminada', 'Perfecto']

const leerJSON = (valor) => (typeof valor === 'string' ? JSON.parse(valor) : valor)

const esEnteroPositivo = (valor) => Number.isInteger(valor) && valor > 0

const esFechaValida = (valor) => typeof valor === 'string' && !Number.isNaN(Date.parse(valor))

function errorServidor(res, contexto, error) {
  console.error(`Error ${contexto}:`, error)
  return res.status(500).json({ mensaje: `Error ${contexto}` })
}

export async function listarPersonajes(req, res) {
  try {
    const [filas] = await db.execute('SELECT id, nombre, datos FROM personaje ORDER BY nombre')
    res.json(filas.map((fila) => ({ ...fila, datos: leerJSON(fila.datos) })))
  } catch (error) {
    errorServidor(res, 'al obtener los personajes', error)
  }
}

export async function listarEquipos(req, res) {
  try {
    const [filas] = await db.execute(
      `SELECT id, nombre, descripcion, size
       FROM equipo
       WHERE usuario_id = ?
       ORDER BY id`,
      [req.user.id]
    )
    res.json(filas)
  } catch (error) {
    errorServidor(res, 'al obtener los equipos', error)
  }
}

export async function crearEquipo(req, res) {
  const { nombre, descripcion = null, size } = req.body

  if (typeof nombre !== 'string' || nombre.trim() === '' || nombre.length > 120) {
    return res.status(400).json({ mensaje: 'El nombre del equipo no es válido' })
  }

  if (descripcion !== null && typeof descripcion !== 'string') {
    return res.status(400).json({ mensaje: 'La descripción no es válida' })
  }

  if (!esEnteroPositivo(size)) {
    return res.status(400).json({ mensaje: 'El tamaño del equipo debe ser un número entero mayor que 0' })
  }

  try {
    const [resultado] = await db.execute(
      'INSERT INTO equipo (usuario_id, nombre, descripcion, size) VALUES (?, ?, ?, ?)',
      [req.user.id, nombre.trim(), descripcion, size]
    )
    res.status(201).json({ id: resultado.insertId, nombre: nombre.trim(), descripcion, size })
  } catch (error) {
    errorServidor(res, 'al crear el equipo', error)
  }
}

export async function listarReclutas(req, res) {
  try {
    const [filas] = await db.execute(
      `SELECT r.id, r.estado, r.equipo_id AS equipoId, r.fecha_reclutamiento AS fechaReclutamiento,
              p.id AS personajeId, p.nombre AS personajeNombre, p.datos AS personajeDatos
       FROM recluta r
       JOIN personaje p ON p.id = r.personaje_id
       WHERE r.usuario_id = ?
       ORDER BY r.id`,
      [req.user.id]
    )
    res.json(filas.map(({ personajeId, personajeNombre, personajeDatos, ...recluta }) => ({
      ...recluta,
      personaje: { id: personajeId, nombre: personajeNombre, datos: leerJSON(personajeDatos) }
    })))
  } catch (error) {
    errorServidor(res, 'al obtener los reclutas', error)
  }
}

export async function crearRecluta(req, res) {
  const { personajeId, estado = 'pendiente' } = req.body

  if (!esEnteroPositivo(personajeId)) {
    return res.status(400).json({ mensaje: 'El personaje no es válido' })
  }

  if (!ESTADOS_RECLUTA.includes(estado)) {
    return res.status(400).json({ mensaje: 'El estado no es válido' })
  }

  try {
    const [personajes] = await db.execute('SELECT id FROM personaje WHERE id = ?', [personajeId])

    if (personajes.length === 0) {
      return res.status(404).json({ mensaje: 'El personaje no existe' })
    }

    const fechaReclutamiento = estado === 'aceptado' ? new Date() : null

    const [resultado] = await db.execute(
      `INSERT INTO recluta (usuario_id, personaje_id, estado, fecha_reclutamiento)
       VALUES (?, ?, ?, ?)`,
      [req.user.id, personajeId, estado, fechaReclutamiento]
    )
    res.status(201).json({ id: resultado.insertId, personajeId, estado, equipoId: null, fechaReclutamiento })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ mensaje: 'Ya has decidido sobre este personaje' })
    }
    errorServidor(res, 'al crear el recluta', error)
  }
}

export async function listarMisiones(req, res) {
  try {
    const [filas] = await db.execute(
      `SELECT m.id, m.mision_id AS misionId, m.nombre_mision AS nombreMision, m.estadisticas,
              m.porcentaje_exito AS porcentajeExito, m.resultado,
              m.fecha_inicio AS fechaInicio, m.fecha_finalizacion AS fechaFinalizacion,
              e.id AS equipoId, e.nombre AS equipoNombre
       FROM historial_misiones m
       JOIN equipo e ON e.id = m.equipo_id
       WHERE m.usuario_id = ?
       ORDER BY m.fecha_inicio DESC`,
      [req.user.id]
    )
    res.json(filas.map((fila) => ({
      ...fila,
      estadisticas: leerJSON(fila.estadisticas),
      porcentajeExito: Number(fila.porcentajeExito)
    })))
  } catch (error) {
    errorServidor(res, 'al obtener las misiones', error)
  }
}

export async function crearMision(req, res) {
  const {
    equipoId,
    misionId,
    nombreMision,
    estadisticas,
    porcentajeExito,
    resultado = 'Pendiente',
    fechaInicio,
    fechaFinalizacion
  } = req.body

  if (!esEnteroPositivo(equipoId)) {
    return res.status(400).json({ mensaje: 'El equipo no es válido' })
  }

  if (typeof misionId !== 'string' || misionId.trim() === '' || misionId.length > 50) {
    return res.status(400).json({ mensaje: 'El identificador de la misión no es válido' })
  }

  if (typeof nombreMision !== 'string' || nombreMision.trim() === '' || nombreMision.length > 255) {
    return res.status(400).json({ mensaje: 'El nombre de la misión no es válido' })
  }

  if (estadisticas === null || typeof estadisticas !== 'object') {
    return res.status(400).json({ mensaje: 'Las estadísticas no son válidas' })
  }

  if (typeof porcentajeExito !== 'number' || porcentajeExito < 0 || porcentajeExito > 100) {
    return res.status(400).json({ mensaje: 'El porcentaje de éxito debe estar entre 0 y 100' })
  }

  if (!RESULTADOS_MISION.includes(resultado)) {
    return res.status(400).json({ mensaje: 'El resultado no es válido' })
  }

  if (!esFechaValida(fechaInicio) || !esFechaValida(fechaFinalizacion)) {
    return res.status(400).json({ mensaje: 'Las fechas no son válidas' })
  }

  if (new Date(fechaFinalizacion) < new Date(fechaInicio)) {
    return res.status(400).json({ mensaje: 'La fecha de finalización no puede ser anterior a la de inicio' })
  }

  try {
    const [equipos] = await db.execute(
      'SELECT id FROM equipo WHERE id = ? AND usuario_id = ?',
      [equipoId, req.user.id]
    )

    if (equipos.length === 0) {
      return res.status(404).json({ mensaje: 'El equipo no existe' })
    }

    const [insercion] = await db.execute(
      `INSERT INTO historial_misiones
         (usuario_id, equipo_id, mision_id, nombre_mision, estadisticas,
          porcentaje_exito, resultado, fecha_inicio, fecha_finalizacion)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        equipoId,
        misionId.trim(),
        nombreMision.trim(),
        JSON.stringify(estadisticas),
        porcentajeExito,
        resultado,
        new Date(fechaInicio),
        new Date(fechaFinalizacion)
      ]
    )
    res.status(201).json({ id: insercion.insertId })
  } catch (error) {
    errorServidor(res, 'al crear la misión', error)
  }
}
