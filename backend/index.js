import 'dotenv/config'
import app from './src/app.js'
import { comprobarConexion } from './src/config/database.js'
import { inicializarTablas } from './src/config/initDatabase.js'
import { cargarPersonajes } from './src/config/seedCharacters.js'

const PORT = process.env.PORT || 3000

async function iniciarServidor() {
  try {
    await comprobarConexion()

    await inicializarTablas()

    await cargarPersonajes()

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
  } catch (error) {
    console.error('Error al iniciar el servidor:', error)
    process.exit(1)
  }
}

iniciarServidor()
