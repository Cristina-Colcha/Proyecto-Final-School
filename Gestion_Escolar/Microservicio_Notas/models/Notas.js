const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');

const Nota = sequelize.define('Nota', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nota: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    fecha_evaluacion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
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
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'Notas',
});

module.exports = Nota;
