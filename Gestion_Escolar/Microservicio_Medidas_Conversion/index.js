const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();
const port = 3015;

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static('views'));
// Rutas
const conversionRoutes = require('./routes/conversion');
app.use('/api/conversion', conversionRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicio del servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
