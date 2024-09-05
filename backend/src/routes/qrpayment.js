import { Router } from "express";
import { createQR, cancelQRPayment, reviveQRPayment, sendCommonVerification, fastUpdateQrAmmount} from '../controllers/qrpayment'

const router = Router();

/**
 * @swagger
 * tags:
 *  name: QR
 *  description: QR endpoint
 *  tags: [QR]
 */

/**
 * @swagger
 * /qroptions:
 *  post:
 *    summary: Crea un nuevo registro QR.
 *    tags: [QR]
 */
router.post('/qroptions', createQR)

/**
 * @swagger
 * /qroptions/:id:
 *  put:
 *    summary: Cancela el pago QR.
 *    tags: [QR]
 */
router.put('/qroptions/:id', cancelQRPayment)

/**
 * @swagger
 * /qroptionsrepeat/:id:
 *  put:
 *    summary: Renueva el pago QR existente.
 *    tags: [QR]
 */
router.put('/qroptionsrepeat/:id', reviveQRPayment)

/**
 * @swagger
 * /qroptionsuser/:id:
 *  put:
 *    summary: Envia el comprobante QR de usuario a su tabla.
 *    tags: [QR]
 */
router.put('/qroptionsuser/:id', sendCommonVerification)

/**
 * @swagger
 * /qroptionspark/:id:
 *  put:
 *    summary: Actualiza el monto de una transaccion.
 *    tags: [QR]
 */
router.put('/qroptionspark/:id', fastUpdateQrAmmount)

export default router;
