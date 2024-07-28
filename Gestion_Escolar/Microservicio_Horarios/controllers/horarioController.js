const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los horarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Horarios');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Obtener un horario por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM Horarios WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).send('Horario no encontrado');
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Crear nuevo horario
router.post('/', async (req, res) => {
  const { curso_name, profesor_nombre, profesor_apellido, dia_semana, hora_inicio, hora_fin } = req.body;

  try {
    const [cursoIdResult] = await db.query('SELECT id FROM cursos_db.Cursos WHERE name = ?', [curso_name]);
    const [profesorIdResult] = await db.query('SELECT id FROM profesores_db.Profesores WHERE nombre = ? AND apellido = ?', [profesor_nombre, profesor_apellido]);

    if (cursoIdResult.length === 0 || profesorIdResult.length === 0) {
      return res.status(404).send('Curso or Profesor not found');
    }

    const curso_id = cursoIdResult[0].id;
    const profesor_id = profesorIdResult[0].id;

    await db.query('INSERT INTO Horarios (curso_id, profesor_id, dia_semana, hora_inicio, hora_fin) VALUES (?, ?, ?, ?, ?)', 
                   [curso_id, profesor_id, dia_semana, hora_inicio, hora_fin]);

    res.status(201).send('Horario creado');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Actualizar horario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { dia_semana, hora_inicio, hora_fin } = req.body;

  try {
    await db.query('UPDATE Horarios SET dia_semana = ?, hora_inicio = ?, hora_fin = ? WHERE id = ?', 
                   [dia_semana, hora_inicio, hora_fin, id]);
    res.send('Horario actualizado');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Eliminar horario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM Horarios WHERE id = ?', [id]);
    res.send('Horario eliminado');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
