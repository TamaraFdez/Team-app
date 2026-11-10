import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'Backend de Team-App funcionando'
  })
})

app.use('/api/auth', authRoutes)
export default app
