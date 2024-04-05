import { Router } from "express";
import { reportParkToUser, reportUserToPark } from '../controllers/reports'

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Reports
 *  description: reports endpoint
 *  tags: [reports]
 */

/**
 * @swagger
 * /reporttouser:
 *  post:
 *    summary: Crea un reporte de un establecimiento a un usuario.
 *    tags: [reports]
 */
router.post('/reporttouser', reportParkToUser)

/**
 * @swagger
 * /reporttouser:
 *  post:
 *    summary: Crea un reporte de un usuario a un establecimiento.
 *    tags: [reports]
 */
router.post('/reporttopark', reportUserToPark)


export default router;
