const Pago = require('../models/pagoModel');
const { client } = require('../config/mqttConfig');

const getPagosById = (req, res) => {
  Pago.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).send('Pago not found');
    } else {
      res.status(200).json(result[0]);
    }
  });
};

const createPago = (req, res) => {
  const { nombre, apellido, monto, fecha_pago, concepto } = req.body;

  Pago.findByStudentName(nombre, apellido, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.length === 0) {
      res.status(404).send('Student not found');
    } else {
      const estudiante_id = result[0].id;
      const newPago = { estudiante_id, monto, fecha_pago, concepto };

      Pago.create(newPago, (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          client.publish('pagos/created', JSON.stringify(newPago));
          res.status(201).json({ id: result.insertId, ...newPago });
        }
      });
    }
  });
};

const updatePago = (req, res) => {
  const { monto, fecha_pago, concepto } = req.body;

  Pago.update(req.params.id, { monto, fecha_pago, concepto }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Pago not found');
    } else {
      res.status(200).send('Pago updated successfully');
    }
  });
};

const deletePago = (req, res) => {
  Pago.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else if (result.affectedRows === 0) {
      res.status(404).send('Pago not found');
    } else {
      res.status(200).send('Pago deleted successfully');
    }
  });
};

module.exports = { getPagosById, createPago, updatePago, deletePago };
