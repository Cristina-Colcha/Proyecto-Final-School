const mysql = require('mysql2/promise');

// Crear la conexión a la base de datos
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1305199',
  database: 'horarios_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos exitosa!');
    connection.release();
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  }
}

testConnection();

module.exports = pool;
