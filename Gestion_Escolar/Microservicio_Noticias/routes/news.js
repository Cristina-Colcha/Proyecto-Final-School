const express = require('express');
const axios = require('axios');
const router = express.Router();

const NEWS_API_KEY = '2ba40d3eac464835849c8896ee03e8b0';

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Obtiene las noticias más recientes o busca noticias específicas
 *     parameters:
 *       - name: query
 *         in: query
 *         description: Término de búsqueda para las noticias
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de noticias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get('/news', async (req, res) => {
  const { query } = req.query;
  let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

  if (query) {
    url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`;
  }

  try {
    const response = await axios.get(url);
    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las noticias', error: error.message });
  }
});

module.exports = router;
