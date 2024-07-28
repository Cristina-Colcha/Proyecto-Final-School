const db = require('../models');
const { Role, User } = db;

// Función para obtener todos los roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        console.error("Error al obtener roles:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Función para crear un nuevo rol
exports.createRole = async (req, res) => {
    const { role_name } = req.body;

    try {
        const newRole = await Role.create({ role_name });
        res.status(201).json(newRole);
    } catch (error) {
        console.error("Error al crear rol:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Función para actualizar un rol existente
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { role_name } = req.body;

    try {
        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({ message: "Rol no encontrado." });
        }

        role.role_name = role_name;
        await role.save();

        res.status(200).json(role);
    } catch (error) {
        console.error("Error al actualizar rol:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Función para eliminar un rol
exports.deleteRole = async (req, res) => {
    const { id } = req.params;

    try {
        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({ message: "Rol no encontrado." });
        }

        await role.destroy();
        res.status(204).json();
    } catch (error) {
        console.error("Error al eliminar rol:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
