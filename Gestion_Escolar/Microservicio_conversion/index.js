const app = require('./app');
const mongoose = require('mongoose');
const mqttClient = require('./mqttClient');

const PORT = process.env.PORT || 3012;
const MONGO_URI = 'mongodb://localhost:27017/conversion-service';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
