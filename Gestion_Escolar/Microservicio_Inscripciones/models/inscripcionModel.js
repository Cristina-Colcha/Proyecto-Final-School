// models/inscripcionModel.js
const db = require('../config/db'); 

const getInscripciones = (callback) => {
    db.query('SELECT * FROM inscripciones', callback);
};

const getInscripcionById = (id, callback) => {
    db.query('SELECT * FROM inscripciones WHERE id = ?', [id], callback);
};

const createInscripcion = (inscripcion, callback) => {
    db.query('INSERT INTO inscripciones SET ?', inscripcion, callback);
};

const updateInscripcion = (id, inscripcion, callback) => {
    db.query('UPDATE inscripciones SET ? WHERE id = ?', [inscripcion, id], callback);
};

const deleteInscripcion = (id, callback) => {
    db.query('DELETE FROM inscripciones WHERE id = ?', [id], callback);
};

// Función para verificar duplicados
const checkDuplicateInscripcion = (inscripcion, callback) => {
    const { estudiante_id, curso_id, fecha_inscripcion } = inscripcion;
    db.query('SELECT * FROM inscripciones WHERE estudiante_id = ? AND curso_id = ? AND fecha_inscripcion = ?', 
             [estudiante_id, curso_id, fecha_inscripcion], callback);
};

module.exports = {
    getInscripciones,
    getInscripcionById,
    createInscripcion,
    updateInscripcion,
    deleteInscripcion,
    checkDuplicateInscripcion
};
