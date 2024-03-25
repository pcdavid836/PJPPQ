import { Router } from "express";
import { getParkTimeByID, getParkTimetoEdit, updateParkTime } from '../controllers/parktime'

const router = Router();

/**
 * @swagger
 * tags:
 *  name: parktime
 *  description: park endpoint
 *  tags: [ParkingTime]
 */

/**
 * @swagger
 * /parktime/:id:
 *  get:
 *    summary: Obtiene todos los horarios de un parqueo dependiendo su estado activo.
 *    tags: [ParkingTime]
 */
router.get('/parktime/:id', getParkTimeByID)

/**
 * @swagger
 * /parktime/:id:
 *  get:
 *    summary: Obtiene todos los horarios de parqueo no importa su estado.
 *    tags: [ParkingTime]
 */
router.get('/parktimetoedit/:id', getParkTimetoEdit)

/**
 * @swagger
 * /parktime/:id:
 *  put:
 *    summary: Obtiene las distintas id de un horario junto al id de los dias de ese horario y se modifica a lo que indique un usuario.
 *    tags: [ParkingTime]
 */
router.put('/parktime', updateParkTime)


export default router;