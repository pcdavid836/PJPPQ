import { Router } from "express";
import { createRecord, postEnter, getParkVehicleByParkId, denyAparkment, aprobeAparkment, getFilteredParkVehicleByParkId } from '../controllers/parkVehicle'

const router = Router();

/**
 * @swagger
 * tags:
 *  name: parkVehicle
 *  description: parkVehicle endpoint
 *  tags: [ParkVehicle]
 */

/**
 * @swagger
 * /parkvehicle:
 *  post:
 *    summary: Crea un registro de un vehiculo que entra a un parqueo.
 *    tags: [ParkVehicle]
 */
router.post('/parkvehicle', createRecord)

/**
 * @swagger
 * /parkvehicleenter/:id:
 *  get:
 *    summary: Realiza la insercion de imagen y confirmacion de ingreso de vehiculo al parqueo.
 *    tags: [ParkVehicle]
 */
router.put('/parkvehicleenter/:id', postEnter)

/**
 * @swagger
 * /parkvehicle/:id:
 *  get:
 *    summary: Obtiene todos los campos de parkvehicle dependiendo la id de un parqueo, tambien obtiene informacion del vehiculo de esa fila y la informacion sobre el tiempo de reserva de la tabla reserva.
 *    tags: [ParkVehicle]
 */
router.get('/parkvehicle/:id', getParkVehicleByParkId)

/**
 * @swagger
 * /parkvehiclefinish/:id:
 *  get:
 *    summary: Ingresa la hora actual en la que un vehiculo sale de algun establecimiento y confirma esta accion.
 *    tags: [ParkVehicle]
 */
router.put('/parkvehiclefinish/:id', aprobeAparkment)

/**
 * @swagger
 * /parkvehicledeny:
 *  get:
 *    summary: Cancela la operacion en caso de que alguien realice un engaño.
 *    tags: [ParkVehicle]
 */
router.put('/parkvehicledeny', denyAparkment)

/**
 * @swagger
 * /parkvehiclefilter:
 *  post:
 *    summary: Obtiene una lista de control de vehiculos en un parqueo dependiendo de valores determinados por un usuario.
 *    tags: [ParkVehicle]
 */
router.post('/parkvehiclefilter', getFilteredParkVehicleByParkId)

export default router;