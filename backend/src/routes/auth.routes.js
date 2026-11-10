
import { Router } from 'express'

import {
  registrar,
  iniciarSesion,
  obtenerSesion,
  cerrarSesion
} from '../controllers/auth.controller.js'

import { verificarToken } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/register', registrar)
router.post('/login', iniciarSesion)

// Rutas que necesitan autenticación
router.get('/me', verificarToken, obtenerSesion)
router.post('/logout', cerrarSesion)

export default router
