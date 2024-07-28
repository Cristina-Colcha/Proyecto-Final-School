const { Sequelize, DataTypes } = require('sequelize');
const courseSequelize = new Sequelize('cursos_db', 'root', '1305199', {
    host: 'localhost',
    dialect: 'mysql',
});

// Modelo de Cursos
const Cursos = courseSequelize.define('Cursos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    creditos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Cursos',
    timestamps: false,
});

module.exports = Cursos;
