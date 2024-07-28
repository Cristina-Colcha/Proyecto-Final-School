const express = require('express');
const path = require('path'); // Importa el módulo 'path' de Node.js
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Asegúrate de tener tu archivo Swagger definido
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3011;

// Middleware para parsear JSON y manejar los datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MongoDB (asegúrate de tener MongoDB instalado y corriendo localmente)
connectDB();

// Definición de un esquema para el modelo de contacto
const ContactoSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  message: String
});

const Contacto = mongoose.model('Contacto', ContactoSchema);

// Ruta para almacenar contacto
app.post('/contacto', async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;
    const nuevoContacto = new Contacto({ name, email, phoneNumber, message });
    await nuevoContacto.save();
    res.status(201).json({ message: 'Contacto almacenado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al almacenar el contacto' });
  }
});

// Middleware para servir archivos estáticos desde el directorio 'fanadesh-html'
app.use(express.static(path.join(__dirname, 'Pagina', 'fanadesh-html')));

// Ruta para Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Manejar cualquier otra ruta y redirigir a index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
