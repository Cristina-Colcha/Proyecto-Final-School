const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const temperatureRoutes = require('./routes/temperatureRoutes');

const app = express();

app.use(express.json());
app.use(express.static('views'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/temperature', temperatureRoutes);

const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
