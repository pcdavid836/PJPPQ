import { Router } from "express";
import { getParkTimeByID } from '../controllers/parktime'

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
 *    summary: Obtiene todos los parqueos aprobados dentro el sistema.
 *    tags: [ParkingTime]
 */
router.get('/parktime/:id', getParkTimeByID)

export default router;