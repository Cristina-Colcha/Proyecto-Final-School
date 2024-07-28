const { db } = require('../config/dbConfig');

const Pago = {
  create: (data, callback) => {
    const query = 'INSERT INTO Pagos (estudiante_id, monto, fecha_pago, concepto) VALUES (?, ?, ?, ?)';
    db.query(query, [data.estudiante_id, data.monto, data.fecha_pago, data.concepto], callback);
  },
  update: (id, data, callback) => {
    const query = 'UPDATE Pagos SET monto = ?, fecha_pago = ?, concepto = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    db.query(query, [data.monto, data.fecha_pago, data.concepto, id], callback);
  },
  findById: (id, callback) => {
    const query = 'SELECT * FROM Pagos WHERE id = ?';
    db.query(query, [id], callback);
  },
  findByStudentName: (firstName, lastName, callback) => {
    const query = `SELECT id FROM estudiantes_db.Estudiantes WHERE nombre = ? AND apellido = ?`;
    db.query(query, [firstName, lastName], callback);
  }
};

module.exports = Pago;
