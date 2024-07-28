const Conversion = require('../models/conversionModel');
const mqtt = require('mqtt');

const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});

exports.convertToInteger = async (req, res) => {
  try {
    const { number } = req.body;
    const convertedNumber = Math.round(number); // Redondea el número decimal al entero más cercano
    const newConversion = new Conversion({
      original: number,
      converted: convertedNumber,
      type: 'decimal to integer',
      date: new Date()
    });

    await newConversion.save();
    mqttClient.publish('conversion/results', JSON.stringify(newConversion));

    res.json(newConversion);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getConversions = async (req, res) => {
  try {
    const conversions = await Conversion.find().sort({ date: -1 });
    res.json(conversions);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAnalysis = async (req, res) => {
  try {
    const totalConversions = await Conversion.countDocuments();
    const decimalToInt = await Conversion.countDocuments({ type: 'decimal to integer' });
    const intToDecimal = await Conversion.countDocuments({ type: 'integer to decimal' });

    res.json({
      totalConversions,
      decimalToInt,
      intToDecimal
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
