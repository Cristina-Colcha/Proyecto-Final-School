const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('asistencia_db', 'root', '13051999', {
    host: 'localhost',
    dialect: 'mysql',
});

const Attendance = sequelize.define('Attendance', {
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
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    asistencia: {
        type: DataTypes.BOOLEAN,
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
    tableName: 'Asistencia',
    timestamps: false,
});

module.exports = Attendance;


