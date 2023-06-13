import { Router } from "express";
import { createUser, getUser, updateUser, deleteUser, getUserid, getUserMail } from '../controllers/user'

const router = Router();

/**
 * @swagger
 * tags:
 *  name: user
 *  description: user endpoint
 *  tags: [User]
 */

/**
 * @swagger
 * /user:
 *  get:
 *    summary: Obtiene todos los usuarios
 *    tags: [User]
 */
router.get('/user', getUser)

/**
 * @swagger
 * /user/:id:
 *  get:
 *    summary: Obtiene a un usuario por su id
 *    tags: [User]
 */
router.get('/user/:id', getUserid)

/**
 * @swagger
 * /user/:id:
 *  get:
 *    summary: Obtiene a un usuario por su id
 *    tags: [User]
 */
router.get('/usermail', getUserMail)

/**
 * @swagger
 * /user:
 *  post:
 *    summary: Crea un nuevo usuario
 *    tags: [User]
 */
router.post('/user', createUser)

/**
 * @swagger
 * /user:
 *  put:
 *    summary: Modifica a un usuario por su id
 *    tags: [User]
 */
router.put('/user/:id', updateUser)

/**
 * @swagger
 * /userdelete/:id:
 *  put:
 *    summary: Elimina un usuario por su id
 *    tags: [User]
 */
router.put('/userdelete/:id', deleteUser)


export default router;