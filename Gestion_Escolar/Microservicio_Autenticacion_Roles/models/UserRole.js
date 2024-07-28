// models/UserRole.js
module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Usuarios',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Roles',
                key: 'id'
            },
            onDelete: 'CASCADE'
        }
    }, {
        tableName: 'UsuarioRoles',
        timestamps: false
    });

    return UserRole;
};
