import { Router } from "express";
import { getOwnerByPark} from '../controllers/parkUser'

const router = Router();

/**
 * @swagger
 * tags:
 *  name: ParkUser
 *  description: park endpoint
 *  tags: [ParkingOwner]
 */

/**
 * @swagger
 * /parkuser/:id:
 *  get:
 *    summary: Obtiene todos los dueños y copropietarios de un parqueo por la id de un parqueo y su estado.
 *    tags: [ParkingOwner]
 */
router.get('/parkuser/:id', getOwnerByPark)



export default router;