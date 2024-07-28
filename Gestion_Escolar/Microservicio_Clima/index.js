const express = require('express');
const axios = require('axios');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path'); // Add this line

const app = express();
const PORT = 3018;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather Microservice',
      version: '1.0.0',
      description: 'A microservice to fetch weather data using the Meteosource API',
    },
  },
  apis: ['./index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Weather API endpoint
/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Fetch weather data
 *     parameters:
 *       - in: query
 *         name: place_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The place ID for the location.
 *       - in: query
 *         name: sections
 *         schema:
 *           type: string
 *           example: all
 *         description: The sections to include in the response.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
app.get('/weather', async (req, res) => {
  const { place_id, sections = 'current,daily' } = req.query;
  
  if (!place_id) {
    return res.status(400).json({ error: 'place_id is required' });
  }

  try {
    const response = await axios.get(`https://www.meteosource.com/api/v1/free/point`, {
      params: {
        place_id,
        sections,
        timezone: 'UTC',
        language: 'en',
        units: 'metric',
        key: 'nn1l3az3kaadkfj3tungfm8rhxfg1s1fnhdm4yec',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
