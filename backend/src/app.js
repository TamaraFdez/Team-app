import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import apiRoutes from './routes/api.js'

const app = express()
app.set('trust proxy', 1)
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'Backend de Team-App funcionando'
  })
})

app.use('/api/auth', authRoutes)
app.use('/api', apiRoutes)
export default app
