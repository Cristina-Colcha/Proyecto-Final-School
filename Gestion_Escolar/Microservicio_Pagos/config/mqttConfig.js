const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com');

const connectMQTT = () => {
  client.on('connect', () => {
    console.log('Connected to MQTT broker');
  });

  client.on('error', (err) => {
    console.error('MQTT connection error:', err);
  });
};

module.exports = { client, connectMQTT };
