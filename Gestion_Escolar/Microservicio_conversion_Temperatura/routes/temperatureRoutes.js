const express = require('express');
const router = express.Router();
const temperatureController = require('../controllers/temperatureController');

router.get('/convert', temperatureController.convertTemperature);

module.exports = router;
