exports.convertTemperature = (req, res) => {
    const { value, fromScale, toScale } = req.query;
    let result;

    if (!value || !fromScale || !toScale) {
        return res.status(400).json({ error: 'Value, fromScale, and toScale are required' });
    }

    const tempValue = parseFloat(value);
    if (isNaN(tempValue)) {
        return res.status(400).json({ error: 'Invalid temperature value' });
    }

    if (fromScale === 'celsius') {
        if (toScale === 'fahrenheit') {
            result = (tempValue * 9/5) + 32;
        } else if (toScale === 'kelvin') {
            result = tempValue + 273.15;
        }
    } else if (fromScale === 'fahrenheit') {
        if (toScale === 'celsius') {
            result = (tempValue - 32) * 5/9;
        } else if (toScale === 'kelvin') {
            result = (tempValue - 32) * 5/9 + 273.15;
        }
    } else if (fromScale === 'kelvin') {
        if (toScale === 'celsius') {
            result = tempValue - 273.15;
        } else if (toScale === 'fahrenheit') {
            result = (tempValue - 273.15) * 9/5 + 32;
        }
    } else {
        return res.status(400).json({ error: 'Invalid scale' });
    }

    res.json({ result });
};
