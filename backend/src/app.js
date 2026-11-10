
import express from 'express'

const app = express()

// Permite recibir JSON en las peticiones
app.use(express.json())

// Ruta de comprobación
app.get('/api/health', (req, res) => {
  res.json({
    estado: 'OK',
    mensaje: 'Backend de Team-App funcionando'
  })
})

export default app
