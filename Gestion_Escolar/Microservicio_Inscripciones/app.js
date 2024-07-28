const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mqtt = require('mqtt');
const InscripcionController = require('./controllers/inscripcionesController');
const app = express();
const path = require('path');
require('dotenv').config();

// Configuración del middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de API
app.get('/api/inscripciones', InscripcionController.getAllInscripciones);
app.get('/api/inscripciones/:id', InscripcionController.getInscripcionById);
app.post('/api/inscripciones', InscripcionController.createInscripcion);
app.put('/api/inscripciones/:id', InscripcionController.updateInscripcion);
app.delete('/api/inscripciones/:id', InscripcionController.deleteInscripcion);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
// Configuración del servidor y MQTT
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
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

module.exports = app;
