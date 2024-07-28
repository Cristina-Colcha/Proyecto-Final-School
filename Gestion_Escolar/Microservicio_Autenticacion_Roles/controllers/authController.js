const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { User, Role, UserRole } = db;

// Función para registrar un nuevo usuario
const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await User.create({ username, password: hashedPassword, email });
      const userRole = await Role.findOne({ where: { role_name: 'user' } });
      if (userRole) {
        await UserRole.create({ user_id: user.id, role_id: userRole.id });
      }
      res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Error registering user', error });
    }
  };

// Función para autenticar un usuario
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({
            where: { username }
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Verificar contraseña
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Credenciales inválidas." });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Tiempo de expiración del token
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Función para manejar errores
exports.handleError = async (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
};
