const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs'); // Para el hashing de contraseñas
const jwt = require('jsonwebtoken'); // Para generar tokens JWT
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto por el usuario de tu base de datos
    password: '1305199', // Cambia esto por la contraseña de tu base de datos
    database: 'auth_db' // Nombre de tu base de datos
});

// Conectar a la base de datos MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Middleware para parsear application/json
app.use(bodyParser.json());

// Middleware para parsear application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para permitir solicitudes desde otros dominios (CORS)
const cors = require('cors');
app.use(cors());

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('Bienvenido a la aplicación de gestión escolar');
});

// Ruta estática para servir la vista de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Ruta estática para servir la vista de registro
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Ruta estática para servir la vista de roles
app.get('/roles', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'roles.html'));
});

// Ruta para el login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Por favor, proporciona Usuario y contraseña.' });
    }

    try {
        // Consultar usuario por email en la base de datos
        db.query('SELECT * FROM Usuarios WHERE username = ?', [username], async (error, results) => {
            if (error) {
                throw error;
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Credenciales incorrectas.' });
            }

            // Verificar contraseña
            const isMatch = await bcrypt.compare(password, results[0].password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Credenciales incorrectas.' });
            }

            // Generar token JWT
            const token = jwt.sign({ id: results[0].id }, 'jwt_secret_key', { expiresIn: '1h' });

            res.status(200).json({ token });
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
});

// Ruta para el registro de usuario
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos.' });
    }

    try {
        // Verificar si el email ya está registrado
        db.query('SELECT * FROM Usuarios WHERE email = ?', [email], async (error, results) => {
            if (error) {
                throw error;
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'El email ya está registrado.' });
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insertar usuario en la base de datos
            db.query('INSERT INTO Usuarios (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (error, results) => {
                if (error) {
                    throw error;
                }

                // Asignar rol por defecto 'user'
                db.query('INSERT INTO UsuarioRoles (user_id, role_id) VALUES (?, ?)', [results.insertId, 2], (error) => {
                    if (error) {
                        console.error('Error al asignar rol por defecto:', error);
                    }
                });

                res.status(201).json({ message: 'Registro exitoso.' });
            });
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
});

// Ruta para obtener todos los usuarios con sus roles
app.get('/api/users-with-roles', (req, res) => {
    const query = `
        SELECT Usuarios.id, Usuarios.username, Usuarios.email, Roles.role_name
        FROM Usuarios
        LEFT JOIN UsuarioRoles ON Usuarios.id = UsuarioRoles.user_id
        LEFT JOIN Roles ON UsuarioRoles.role_id = Roles.id
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Ruta para obtener todos los usuarios
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM Usuarios';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Ruta para obtener todos los roles
app.get('/api/roles', (req, res) => {
    const query = 'SELECT * FROM Roles';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Ruta para asignar un rol a un usuario
app.post('/api/roles/assign/:userId', (req, res) => {
    const { userId } = req.params;
    const { roleId } = req.body;

    const query = `
        INSERT INTO UsuarioRoles (user_id, role_id) VALUES (?, ?)
        ON DUPLICATE KEY UPDATE role_id = VALUES(role_id)
    `;

    db.query(query, [userId, roleId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Rol asignado correctamente' });
    });
});

// Ruta para eliminar el rol de un usuario
app.post('/api/roles/remove/:userId', (req, res) => {
    const { userId } = req.params;

    const query = 'DELETE FROM UsuarioRoles WHERE user_id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Rol eliminado correctamente' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
