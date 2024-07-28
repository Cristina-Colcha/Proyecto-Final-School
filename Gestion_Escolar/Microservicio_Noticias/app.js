const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const app = express();
const port = 3017;

// Configuración de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'News API',
    version: '1.0.0',
    description: 'Microservicio para obtener noticias utilizando NewsAPI'
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Servidor local'
    }
  ],
  components: {
    schemas: {
      Article: {
        type: 'object',
        properties: {
          source: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' }
            }
          },
          author: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          url: { type: 'string' },
          urlToImage: { type: 'string' },
          publishedAt: { type: 'string' },
          content: { type: 'string' }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, './routes/*.js')] // Asegúrate de que la ruta sea correcta
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de la API
const newsRouter = require('./routes/news');
app.use('/api', newsRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
