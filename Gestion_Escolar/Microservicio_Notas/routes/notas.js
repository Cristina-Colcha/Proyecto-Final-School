const express = require('express');
const router = express.Router();
const notaController = require('../controllers/notaController');

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Crear una nueva nota
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estudiante_nombre:
 *                 type: string
 *               curso_nombre:
 *                 type: string
 *               nota:
 *                 type: number
 *               fecha_evaluacion:
 *                 type: string
 *                 format: date
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nota creada
 *       500:
 *         description: Error al crear la nota
 */
/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Obtener todas las notas
 *     tags: [Notas]
 *     responses:
 *       200:
 *         description: Lista de todas las notas
 *       500:
 *         description: Error al obtener las notas
 */
/**
 * @swagger
 * /notas/{id}:
 *   get:
 *     summary: Obtener una nota por ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la nota
 *     responses:
 *       200:
 *         description: Nota obtenida
 *       404:
 *         description: Nota no encontrada
 *       500:
 *         description: Error al obtener la nota
 */
/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Actualizar una nota por ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la nota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: number
 *               fecha_evaluacion:
 *                 type: string
 *                 format: date
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nota actualizada
 *       404:
 *         description: Nota no encontrada
 *       500:
 *         description: Error al actualizar la nota
 */
/**
 * @swagger
 * /notas/{id}:
 *   delete:
 *     summary: Eliminar una nota por ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la nota
 *     responses:
 *       204:
 *         description: Nota eliminada
 *       404:
 *         description: Nota no encontrada
 *       500:
 *         description: Error al eliminar la nota
 */

router.post('/notas', notaController.createNota);
router.get('/notas', notaController.getAllNotas);
router.get('/notas/:id', notaController.getNotaById);
router.put('/notas/:id', notaController.updateNota);
router.delete('/notas/:id', notaController.deleteNota);

module.exports = router;
