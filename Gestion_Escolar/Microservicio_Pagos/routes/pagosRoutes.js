const express = require('express');
const router = express.Router();
const { getPagosById, createPago, updatePago, deletePago } = require('../controllers/pagoController');

router.get('/:id', getPagosById);
router.post('/', createPago);
router.put('/:id', updatePago);
router.delete('/:id', deletePago);

module.exports = router;
