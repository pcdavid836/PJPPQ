import { Router } from "express";
import { getVehicleFilterById , getVehicleFilterToEdit, updateVehicleFilter } from '../controllers/parkFilterVehicles'

const router = Router();

/**
 * @swagger
 * tags:
 *  name: parkFilterVehicles
 *  description: park endpoint
 *  tags: [ParkingFilter]
 */

/**
 * @swagger
 * /parkvehiclefilter/:id:
 *  get:
 *    summary: Obtiene todas kas ud de vehiculos de un parqueo pero dependiendo que su estado este activo.
 *    tags: [ParkingFilter]
 */
router.get('/parkvehiclefilter/:id', getVehicleFilterById)

/**
 * @swagger
 * /parkvehiclefilteredit/:id:
 *  get:
 *    summary: Obtiene todos los vehiculos filtrados de in parqueo no importa su estado.
 *    tags: [ParkingFilter]
 */
router.get('/parkvehiclefilteredit/:id', getVehicleFilterToEdit)

/**
 * @swagger
 * /parkvehiclefilter/:id:
 *  put:
 *    summary: Obtiene las distintas id de un filtro de vehiculos junto al id de los tipo de vehiculos de un parqueo y se modifica a lo que indique un usuario.
 *    tags: [ParkingFilter]
 */
router.put('/parkvehiclefilter', updateVehicleFilter)


export default router;