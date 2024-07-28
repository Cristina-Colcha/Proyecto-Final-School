const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const pagosRoutes = require('./routes/pagosRoutes');
const { connectMQTT } = require('./config/mqttConfig.js');

const app = express();
const PORT = 3009;

app.use(cors());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/pagos', pagosRoutes);
app.use(express.static('public'));

connectMQTT();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
