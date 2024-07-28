const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
        url: 'http://localhost:3002/api'
      }
    ]
  },
  apis: ['./src/routes/studentRoutes.js']
});

module.exports = swaggerSpec;
