import { Router } from "express";
import { createBook, getBookByUser, getBookByPark, cancelBook, denyBook } from '../controllers/booking'

const router = Router();

/**
 * @swagger
 * tags:
 *  name: booking
 *  description: booking endpoint
 *  tags: [Booking]
 */

/**
 * @swagger
 * /book:
 *  post:
 *    summary: Crea una reserva para un parqueo.
 *    tags: [Booking]
 */
router.post('/book', createBook)

/**
 * @swagger
 * /bookuser/:id:
 *  get:
 *    summary: Obtiene reservas por el id de un usuario.
 *    tags: [Booking]
 */
router.get('/bookuser/:id', getBookByUser)

/**
 * @swagger
 * /bookpark/:id:
 *  get:
 *    summary: Obtiene reservas por el id de un parqueo.
 *    tags: [Booking]
 */
router.get('/bookpark/:id', getBookByPark)

/**
 * @swagger
 * /bookcancel/:id:
 *  get:
 *    summary: Realiza la "eliminación" de una fila por el id de una reserva en la tabla reserva y parqueo_vehiculo dejando marcado el valor cancelado en ambas tablas.
 *    tags: [Booking]
 */
router.put('/bookcancel/:id', cancelBook)

/**
 * @swagger
 * /bookdeny/:id:
 *  get:
 *    summary:  Realiza la "eliminación" de una fila por el id de una reserva en la tabla reserva y parqueo_vehiculo dejando el valor rechazado en la tabla reserva y cancelado en la de parqueo_vehiculo.
 *    tags: [Booking]
 */
router.put('/bookdeny/:id', denyBook)


export default router;