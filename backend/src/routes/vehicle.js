import { Router } from "express";
import { getCarsid, createVehicle, getUserVehicle, updateVehicle, deleteVehicle } from '../controllers/vehicle'

//Se recomienda ver siempre el archivo de notas

const router = Router();

/**
 * @swagger
 * tags:
 *  name: vehicle
 *  description: vehicle endpoint
 *  tags: [Vehicle]
 */

/**
 * @swagger
 * /vehicle/:id:
 *  get:
 *    summary: Obtiene los vehiculos de un usuario por su id
 *    tags: [Vehicle]
 */
router.get('/vehicle/:id', getCarsid)

/**
 * @swagger
 * /vehicle:
 *  post:
 *    summary: Crea un nuevo vehiculo para algun usuario (los datos deben seringresados en la aplicacion)
 *    tags: [Vehicle]
 */
router.post('/vehicle', createVehicle)

/**
 * @swagger
 * /user/:id:
 *  get:
 *    summary: Obtiene a un vehiculo por su id
 *    tags: [Vehicle]
 */
router.post('/vehicleInfo', getUserVehicle)

/**
 * @swagger
 * /user:
 *  put:
 *    summary: Modifica a un vehiculo por su id
 *    tags: [Vehicle]
 */
router.put('/vehicle/:id', updateVehicle)

/**
 * @swagger
 * /user:
 *  put:
 *    summary: Elimina a un vehiculo por su id
 *    tags: [Vehicle]
 */
router.put('/deletevehicle/:id', deleteVehicle)



export default router;