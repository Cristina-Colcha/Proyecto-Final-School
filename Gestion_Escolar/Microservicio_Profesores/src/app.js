const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const mqtt = require('mqtt');
const profesoresRoutes = require('./routes/profesores');

const app = express();
app.use(express.json());
app.use(express.static('src/views'));

// Swagger setup
const swaggerDocument = yaml.load(fs.readFileSync('./src/swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MQTT setup
const mqttClient = mqtt.connect('mqtt://localhost:1883');
mqttClient.on('connect', () => {
  console.log('MQTT connected');
});

// Pass mqttClient to routes
app.use((req, res, next) => {
  req.mqttClient = mqttClient;
  next();
});

app.use('/InfoProfesores', profesoresRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3003, () => {
  console.log('Server is running on http://localhost:3003');
});

module.exports = { app, mqttClient };
