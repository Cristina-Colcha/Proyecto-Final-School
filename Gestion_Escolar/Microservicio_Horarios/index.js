const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const mqtt = require('mqtt');
const db = require('./config/db');
const horarioController = require('./controllers/horarioController');
const app = express();

// Load Swagger Documentation
const swaggerDocument = YAML.load('./swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/horarios', horarioController);

// Serve static files
app.use(express.static('views'));

// MQTT Client Setup
const client = mqtt.connect('mqtt://localhost:1883');
client.on('connect', () => {
  console.log('MQTT client connected');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
