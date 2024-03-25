import { Router } from "express";
import { getPark, getMyPark, createPark, getParkid, updatePostPark, getPostPark, deletePark, getMyAprobedPark, updatePark, getParkFilters } from '../controllers/park'

const router = Router();

/**
 * @swagger
 * tags:
 *  name: park
 *  description: park endpoint
 *  tags: [Parking]
 */

/**
 * @swagger
 * /park:
 *  get:
 *    summary: Obtiene todos los parqueos
 *    tags: [Parking]
 */
router.get('/park', getPark)

/**
 * @swagger
 * /mypark/:id:
 *  get:
 *    summary: Obtiene un parqueo de un usuario por el id del usuario.
 *    tags: [Parking]
 */
router.get('/mypark/:id', getMyPark)

/**
 * @swagger
 * /park:
 *  post:
 *    summary: Crea la postulacion de un nuevo parqueo
 *    tags: [Parking]
 */
router.post('/park', createPark)

/**
 * @swagger
 * /park/:id:
 *  get:
 *    summary: Obtiene a un parqueo por su id.
 *    tags: [Parking]
 */
router.get('/park/:id', getParkid)

/**
 * @swagger
 * /mypost:
 *  put:
 *    summary: Modifica a un parqueo por su id pero solo a los que estan en la opcion de postulaciones.
 *    tags: [Parking]
 */
router.put('/mypost/:id', updatePostPark)

/**
 * @swagger
 * /mypost:
 *  put:
 *    summary: Modifica a los valores basicos de un parqueo aprobado mediante su id.
 *    tags: [Parking]
 */
router.put('/park/:id', updatePark)


/**
 * @swagger
 * /mypost:
 *  put:
 *    summary: Obtiene a un parqueo por su id pero cuando este este en la fase de postulaciones.
 *    tags: [Parking]
 */
router.post('/mypost', getPostPark)

/**
 * @swagger
 * /user:
 *  put:
 *    summary: Elimina a un parqueo por su id
 *    tags: [Parking]
 */
router.put('/deletepark/:id', deletePark)

/**
 * @swagger
 * /myparkaprobed/:id:
 *  get:
 *    summary: Obtiene un parqueo de un usuario por el id del usuario y que este aprobado en el sistema para ser mostrado en la aplicacion.
 *    tags: [Parking]
 */
router.get('/myparkaprobed/:id', getMyAprobedPark)

/**
 * @swagger
 * /myparkaprobed/:id:
 *  get:
 *    summary: Obtiene los parqueos dependiendo su disponibilidad, tipo y el tipo de vehiculos que admiten.
 *    tags: [Parking]
 */
router.post('/searchfilterparks', getParkFilters)



export default router;