const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3020;  // Default port 
// NASA API key (replace 'DEMO_KEY' with your own key)
const API_KEY = 'hlY9J7wSzgNrT7zaZHequhNU98PXhpU7sydlqW4B';

// NASA's APOD API base URL
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

// Middleware to manage CORS 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Route to obtain the astronomical image of the day

app.get('/apod', async (req, res) => {
    try {
        const response = await axios.get(APOD_URL);
        const data = response.data;


        res.json({
            title: data.title,
            date: data.date,
            explanation: data.explanation,
            imageUrl: data.url // URL of the astronomical image of the day
        });
    } catch (error) {
       
        console.error('Error al obtener la imagen del día:', error.message);
        res.status(500).json({ error: 'Error al obtener la imagen del día' });
    }
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
