const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { handleError } = require('../controllers/authController');

// Rutas para autenticación y autorización
router.post('/register', authController.register);
router.post('/login', authController.login);
router.use(handleError);

module.exports = router;
