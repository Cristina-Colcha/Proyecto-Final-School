const mysql = require('mysql2'); // Usar mysql2 en lugar de mysql

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',   // Asegúrate de que este usuario existe en tu MySQL
    password: process.env.DB_PASSWORD || '1305199', // Asegúrate de que esta contraseña es correcta
    database: process.env.DB_DATABASE || 'inscripciones_db'
});

connection.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + connection.threadId);
});

module.exports = connection;
