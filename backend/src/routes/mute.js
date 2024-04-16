import { Router } from "express";
import { createMute, getStunnedsFromPark, removeMute } from "../controllers/mute";

const router = Router();

/**
 * @swagger
 * /mute:
 *  post:
 *    summary: Silencia o "Banea" a un usuario de un parqueo
 *    tags: [mute]
 */
router.post('/mute', createMute)

/**
 * @swagger
 * /mute/{id}:
 *  get:
 *    summary: Obtiene los usuarios silenciados de un parqueo mediante la id de este mismo.
 *    tags: [mute]
 */
router.get('/mute/:id', getStunnedsFromPark)

/**
 * @swagger
 * /unmute:
 *  post:
 *    summary: Quita el estado de silenciado a un usuario.
 *    tags: [mute]
 */
router.post('/undomute', removeMute)



export default router;