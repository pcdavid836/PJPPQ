import { Router } from "express";
import { createUser, getUser, updateUser, deleteUser, getUserid, getUserMail, updateImageUser, getUserMailExistence, sendVerificationSMS, sendVerificationEmail, updatePassword } from '../controllers/user'

//Se recomienda ver siempre el archivo de notas

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
 *    summary: Obtiene a un usuario por su correo y contraseña
 *    tags: [User]
 */
router.post('/usermail', getUserMail)

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

/**
 * @swagger
 * /userimage/{id}:
 *  put:
 *    summary: Modifica la imagen de un usuario identificado por su id
 *    tags: [User]
 */
router.put('/userimage/:id', updateImageUser)

/**
 * @swagger
 * /usermailexist:
 *  post:
 *    summary: Obtiene a un usuario por su correo para ver la existencia de este
 *    tags: [User]
 */
router.post('/usermailexist', getUserMailExistence)

/**
 * @swagger
 * /verify:
 *  post:
 *    summary: Envia un codigo sms al numero de celular de un usuario
 *    tags: [User]
 */
router.post('/verify', sendVerificationSMS)

/**
 * @swagger
 * /passwordSearchRecover:
 *  post:
 *    summary: Envia un codigo por email a un usuario para que este recupere su contraseña.
 *    tags: [User]
 */
router.post('/passwordsearchrecover', sendVerificationEmail)

/**
 * @swagger
 * /updatepassword:
 *  put:
 *    summary: Mediante el id de un usuario y un codigo modifica la contraseña de un usuario.
 *    tags: [User]
 */
router.put('/updatepassword', updatePassword)

export default router;
