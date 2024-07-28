const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/studentRoutes');
const path = require('path');
const mqttClient = require('./mqtt'); // MQTT client

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api', studentRoutes);

// Swagger setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gestión de Estudiantes API',
      version: '1.0.0',
      description: 'API para la gestión de estudiantes'
    },
    servers: [
      {
        url: `http://localhost:${port}/api`
      }
    ]
  },
  apis: ['./src/routes/studentRoutes.js']
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve static files for the frontend
app.use('/InfoEstudiante', express.static(path.join(__dirname, 'views')));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Start server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});



