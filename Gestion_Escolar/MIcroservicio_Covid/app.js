const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3019;

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
}));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/covid-data/:state', async (req, res) => {
  try {
    const { state } = req.params;
    
    if (!state || state.length !== 2) {
      return res.status(400).json({ error: 'Se requiere un código de estado válido de dos letras' });
    }

    const url = `https://api.covidtracking.com/v1/states/${state.toLowerCase()}/current.json`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error al obtener datos de COVID-19' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
