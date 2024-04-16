import { Router } from "express";
import { getSideKicksFromPark, createSideKick, removeSidekick } from '../controllers/sidekick'

const router = Router();

/**
 * @swagger
 * /sidekick/{id}:
 *   get:
 *     summary: Obtiene a los ayudantes y al dueño de un parqueo por su ID
 *     tags: [sidekick]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del parqueo
 *     responses:
 *       200:
 *         description: Éxito al obtener los ayudantes del parqueo
 *       404:
 *         description: No se encontró el parqueo con el ID proporcionado
 */
router.get('/sidekick/:id', getSideKicksFromPark);

/**
 * @swagger
 * /sidekick:
 *   post:
 *     summary: Realiza cambios a la tabla usuario_has_parqueo basado en un código
 *     tags: [sidekick]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 description: Código para buscar el parqueo
 *             example:
 *               codigo: "código_ejemplo"
 *     responses:
 *       200:
 *         description: Éxito al realizar los cambios en la tabla usuario_has_parqueo
 *       400:
 *         description: Error en la solicitud, por ejemplo, falta el código
 */
router.post('/sidekick', createSideKick);

/**
 * @swagger
 * /sidekick:
 *  post:
 *    summary: Elimina a un ayudante proporcionando su id de usuario y id del parqueo en el cuerpo de la solicitud
 *    tags: [Parking]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              usuario_idUsuario:
 *                type: integer
 *                description: El ID del usuario
 *              parqueo_idParqueo:
 *                type: integer
 *                description: El ID del parqueo
 */
router.post('/removesidekick', removeSidekick);


export default router;
