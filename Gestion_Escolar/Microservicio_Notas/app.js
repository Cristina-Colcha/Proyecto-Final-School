const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const notaRoutes = require('./routes/notas');
const sequelize = require('./Config/database');
const { swaggerUi, swaggerDocs } = require('./swagger/index');
const mqtt = require('mqtt');

const app = express();
const PORT = process.env.PORT || 3006;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (index.html) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/InfoNotas', notaRoutes);

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    next();
});
const mqttClient = mqtt.connect(process.env.MQTT_URL);

mqttClient.on('connect', () => {
    console.log('Conectado a MQTT');
    mqttClient.subscribe('inscripciones', (err) => {
        if (err) console.error('Error al suscribirse a MQTT', err);
    });
});

mqttClient.on('message', (topic, message) => {
    console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
});
// Start server
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
