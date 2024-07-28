const Nota = require('../models/Notas');
const { QueryTypes } = require('sequelize');
const sequelize = require('../Config/database');

exports.createNota = async (req, res) => {
    const { estudiante_nombre, curso_nombre, nota, fecha_evaluacion, descripcion } = req.body;

    try {
        const [estudiante] = await sequelize.query(
            "SELECT id FROM estudiantes_db.Estudiantes WHERE nombre = ?",
            {
                replacements: [estudiante_nombre],
                type: QueryTypes.SELECT
            }
        );

        const [curso] = await sequelize.query(
            "SELECT id FROM cursos_db.Cursos WHERE nombre = ?",
            {
                replacements: [curso_nombre],
                type: QueryTypes.SELECT
            }
        );

        const nuevaNota = await Nota.create({
            estudiante_id: estudiante.id,
            curso_id: curso.id,
            nota,
            fecha_evaluacion,
            descripcion
        });

        res.status(201).json(nuevaNota);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear la nota' });
    }
};

exports.getNotaById = async (req, res) => {
    const { id } = req.params;

    try {
        const nota = await Nota.findByPk(id);

        if (!nota) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }

        res.status(200).json(nota);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener la nota' });
    }
};

exports.updateNota = async (req, res) => {
    const { id } = req.params;
    const { nota, fecha_evaluacion, descripcion } = req.body;

    try {
        const [updated] = await Nota.update(
            { nota, fecha_evaluacion, descripcion },
            { where: { id } }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }

        const updatedNota = await Nota.findByPk(id);
        res.status(200).json(updatedNota);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar la nota' });
    }
};

exports.deleteNota = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Nota.destroy({
            where: { id }
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }

        res.status(204).json();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la nota' });
    }
};

exports.getAllNotas = async (req, res) => {
    try {
        const notas = await Nota.findAll();
        res.status(200).json(notas);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las notas' });
    }
};
