const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('notas_db', 'root', '1305199', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
