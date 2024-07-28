const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Rutas para la gestión de asistencia
router.get('/', attendanceController.getAttendances);
router.post('/', attendanceController.createAttendance);
router.put('/:id', attendanceController.updateAttendance);

module.exports = router;
