const mongoose = require('mongoose');

const ConversionSchema = new mongoose.Schema({
    original: Number,
    converted: Number,
    type: String,
    date: { type: Date, default: Date.now }
});

const Conversion = mongoose.model('Conversion', ConversionSchema);
 
module.exports = Conversion;
