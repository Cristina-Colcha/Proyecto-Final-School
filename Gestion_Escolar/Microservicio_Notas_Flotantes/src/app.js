const express = require('express');
const swaggerUi = require('swagger-ui-express');
const noteRoutes = require('./routes/noteRoutes');
const swaggerDocument = require('./swagger.json');
const path = require('path');
const app = express();
const port = 3016;

app.use(express.json());
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/notes', noteRoutes);
app.get('/', (req, res) => {     res.sendFile(path.join(__dirname, '../public/index.html')); });
app.use(express.static(path.join(__dirname, '../public')));
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});