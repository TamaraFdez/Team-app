import { Router } from 'express'
import { verificarToken } from '../middleware/auth.middleware.js'
import {
  listarPersonajes,
  listarEquipos,
  crearEquipo,
  listarReclutas,
  crearRecluta,
  listarMisiones,
  crearMision
} from '../controllers/api.controller.js'

const router = Router()

router.use(verificarToken)

router.get('/personajes', listarPersonajes)

router.get('/equipos', listarEquipos)
router.post('/equipos', crearEquipo)

router.get('/reclutas', listarReclutas)
router.post('/reclutas', crearRecluta)

router.get('/misiones', listarMisiones)
router.post('/misiones', crearMision)

export default router
