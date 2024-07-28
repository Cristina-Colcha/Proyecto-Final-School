const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.hivemq.com'); // Replace with your MQTT broker address if needed

module.exports = client;
