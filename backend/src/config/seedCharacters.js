
import db from './database.js'

const API_URL = 'https://akabab.github.io/superhero-api/api/all.json'

export async function cargarPersonajes() {
  const [resultado] = await db.query(
    'SELECT COUNT(*) AS total FROM personaje'
  )

  if (resultado[0].total > 0) {
    console.log(`Ya existen ${resultado[0].total} personajes. No hace falta importarlos.`)
    return
  }

  console.log('Descargando personajes de Akabab...')

  const respuesta = await fetch(API_URL, {
    signal: AbortSignal.timeout(30000)
  })

  if (!respuesta.ok) {
    throw new Error(`Error descargando personajes: ${respuesta.status}`)
  }

  const personajes = await respuesta.json()

  if (!Array.isArray(personajes) || personajes.length === 0) {
    throw new Error('La API no ha devuelto una lista válida de personajes')
  }

  const conexion = await db.getConnection()

  try {
    await conexion.beginTransaction()

    for (const personaje of personajes) {
      const { id, name, ...datos } = personaje

      await conexion.execute(
        `INSERT INTO personaje (id, nombre, datos)
         VALUES (?, ?, ?)`,
        [id, name, JSON.stringify(datos)]
      )
    }

    await conexion.commit()

    console.log(`${personajes.length} personajes importados correctamente`)
  } catch (error) {
    await conexion.rollback()
    throw error
  } finally {
    conexion.release()
  }
}
