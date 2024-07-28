const express = require('express');
const router = express.Router();
const conversionController = require('../controllers/conversionController');

// Ruta para convertir un número decimal a entero
router.post('/convert/toInteger', conversionController.convertToInteger);

// Ruta para obtener el historial de conversiones
router.get('/conversions', conversionController.getConversions);

// Ruta para obtener el análisis de conversiones
router.get('/analysis', conversionController.getAnalysis);

module.exports = router;
