const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1305199',
  database: 'cursos_db',
});


// Promisify pool query methods
const promisePool = pool.promise();

// Verificar la conexión al inicio
promisePool.getConnection()
  .then(connection => {
    console.log('Conexión a la base de datos exitosa');
    connection.release(); // Liberar conexión después de verificar
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err.message);
  });

module.exports = promisePool;
