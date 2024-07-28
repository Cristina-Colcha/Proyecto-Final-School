// controllers/inscripcionController.js
const Inscripcion = require('../models/inscripcionModel');

const getAllInscripciones = (req, res) => {
    Inscripcion.getInscripciones((err, rows) => {
        if (err) return res.status(500).send({ error: err.message });
        res.json(rows);
    });
};

const getInscripcionById = (req, res) => {
    const id = req.params.id;
    Inscripcion.getInscripcionById(id, (err, row) => {
        if (err) return res.status(500).send({ error: err.message });
        if (row.length === 0) return res.status(404).send({ message: 'Inscripción no encontrada' });
        res.json(row[0]);
    });
};

const createInscripcion = (req, res) => {
    const newInscripcion = req.body;
    // Verifica si la inscripción ya existe
    Inscripcion.checkDuplicateInscripcion(newInscripcion, (err, rows) => {
        if (err) return res.status(500).send({ error: err.message });
        if (rows.length > 0) return res.status(400).send({ error: 'Ya existe una inscripción con los mismos datos.' });
        
        Inscripcion.createInscripcion(newInscripcion, (err, result) => {
            if (err) return res.status(500).send({ error: err.message });
            res.status(201).send({ id: result.insertId });
        });
    });
};

const updateInscripcion = (req, res) => {
    const id = req.params.id;
    const updatedInscripcion = req.body;
    
    // Verifica si la inscripción ya existe (y no es la misma que la que estamos actualizando)
    Inscripcion.checkDuplicateInscripcion(updatedInscripcion, (err, rows) => {
        if (err) return res.status(500).send({ error: err.message });
        if (rows.length > 0 && rows[0].id.toString() !== id) {
            return res.status(400).send({ error: 'Ya existe una inscripción con los mismos datos.' });
        }
        
        Inscripcion.updateInscripcion(id, updatedInscripcion, (err, result) => {
            if (err) return res.status(500).send({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).send({ message: 'Inscripción no encontrada' });
            res.send({ message: 'Inscripción actualizada' });
        });
    });
};

const deleteInscripcion = (req, res) => {
    const id = req.params.id;
    Inscripcion.deleteInscripcion(id, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).send({ message: 'Inscripción no encontrada' });
        res.send({ message: 'Inscripción eliminada' });
    });
};

module.exports = {
    getAllInscripciones,
    getInscripcionById,
    createInscripcion,
    updateInscripcion,
    deleteInscripcion
};
