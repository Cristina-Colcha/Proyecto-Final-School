const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
 
client.on('connect', () => {
  console.log('Conectado a MQTT');
});
 
client.on('error', (error) => {
  console.error('Error en MQTT:', error);
});
 
module.exports = client;