const express = require('express');
const router = express.Router();
const conversionModel = require('../models/conversion');

// Ruta para conversión
router.get('/:fromUnit/:toUnit/:value', (req, res) => {
    try {
        const { fromUnit, toUnit, value } = req.params;
        const unidad = `${fromUnit}-${toUnit}`;
        const resultado = conversionModel.convertir(unidad, parseFloat(value));
        res.json({ fromUnit, toUnit, value, result: resultado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
