const Attendance = require('../models/attendanceModel');
const Estudiantes = require('../models/studentModel');
const Cursos = require('../models/courseModel');

/**
 * Get all attendance records or filter by estudiante_id
 */
exports.getAttendances = async (req, res) => {
    try {
        const { estudiante_id } = req.query;
        let query = {};
        if (estudiante_id) {
            query.estudiante_id = estudiante_id;
        }
        const attendances = await Attendance.findAll({ where: query });
        res.json(attendances);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving attendances' });
    }
};

/**
 * Create a new attendance record
 */
exports.createAttendance = async (req, res) => {
    try {
        const { estudiante_id, curso_id, fecha, asistencia } = req.body;

        // Verificar si el estudiante existe
        const estudiante = await Estudiantes.findByPk(estudiante_id);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }

        // Verificar si el curso existe
        const curso = await Cursos.findByPk(curso_id);
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Crear el registro de asistencia
        const newAttendance = await Attendance.create({ estudiante_id, curso_id, fecha, asistencia });
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(500).json({ message: 'Error creating attendance' });
    }
};

/**
 * Update an attendance record by ID
 */
exports.updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { estudiante_id, curso_id, asistencia } = req.body;

        // Verificar si la asistencia existe
        const attendance = await Attendance.findByPk(id);
        if (!attendance) {
            return res.status(404).json({ message: 'Asistencia no encontrada' });
        }

        // Verificar si el estudiante existe si se proporciona el ID
        if (estudiante_id) {
            const estudiante = await Estudiantes.findByPk(estudiante_id);
            if (!estudiante) {
                return res.status(404).json({ message: 'Estudiante no encontrado' });
            }
        }

        // Verificar si el curso existe si se proporciona el ID
        if (curso_id) {
            const curso = await Cursos.findByPk(curso_id);
            if (!curso) {
                return res.status(404).json({ message: 'Curso no encontrado' });
            }
        }

        // Actualizar el registro de asistencia
        await Attendance.update({ asistencia }, { where: { id } });
        res.json({ message: 'Attendance updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating attendance' });
    }
};

