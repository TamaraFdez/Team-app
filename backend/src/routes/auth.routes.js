import { Router } from 'express'
import rateLimit from 'express-rate-limit'

import {
  registrar,
  iniciarSesion,
  obtenerSesion,
  cerrarSesion
} from '../controllers/auth.controller.js'

import { verificarToken } from '../middleware/auth.middleware.js'

const router = Router()

const limiteAuth = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 10,                // 10 intentos por IP en esa ventana
  standardHeaders: true,
  legacyHeaders: false,
  message: { mensaje: 'Demasiados intentos. Espera unos minutos.' }
})

router.post('/register', limiteAuth, registrar)
router.post('/login', limiteAuth, iniciarSesion)

// Rutas que necesitan autenticación
router.get('/me', verificarToken, obtenerSesion)
router.post('/logout', cerrarSesion)

export default router
