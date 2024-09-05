import { Router } from "express";
import { getImageQR } from '../controllers/imageqr'

const router = Router();

/**
 * @swagger
 * tags:
 *  name: QrSource
 *  description: qr_source endpoint
 *  tags: [QrSource]
 */

/**
 * @swagger
 * /qrsource:
 *  get:
 *    summary: Obtiene todas las imágenes de la tabla qr_source.
 *    tags: [QrSource]
 */
router.get('/qrsource', getImageQR)

export default router;
