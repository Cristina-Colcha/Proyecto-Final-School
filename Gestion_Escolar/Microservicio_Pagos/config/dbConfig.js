const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'pagos_db'
});

const estudiantesDb = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'estudiantes_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to pagos_db');
});

estudiantesDb.connect((err) => {
  if (err) throw err;
  console.log('Connected to estudiantes_db');
});

module.exports = { db, estudiantesDb };
