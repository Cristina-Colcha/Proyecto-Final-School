const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3014;

// Clave API de Google Books
const apiKey = 'AIzaSyB3VbMzdC4TC4rHj7AfsWVIT2O_TvHenaI';

// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Google Books API Microservice',
      version: '1.0.0',
      description: 'Microservice to search books using Google Books API',
    },
  },
  apis: ['app.js'], // Especifica el archivo que contiene tus rutas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Ruta para servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para buscar libros
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Search books
 *     description: Search books using the Google Books API.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query term.
 *     responses:
 *       '200':
 *         description: A list of books matching the search query.
 */
app.get('/books', async (req, res) => {
    try {
      const { query } = req.query;
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;
      
      console.log('URL de solicitud:', url); // Imprime la URL en la consola
  
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Respuesta de Google Books API:', data); // Imprime la respuesta en la consola
      
      res.json(data);
    } catch (error) {
      console.error('Error al buscar libros:', error);
      res.status(500).json({ error: error.message });
    }
  });
  

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
