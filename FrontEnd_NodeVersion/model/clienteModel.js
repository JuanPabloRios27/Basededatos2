// clienteModel.js
const db = require('../config/db');

const Cliente = {
    // Obtener el total de clientes
    contarClientes: (callback) => {
        const query = 'SELECT COUNT(*) AS total FROM clientes';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results[0].total);
        });
    },

    // Obtener un cliente por posición
    obtenerClientePorPosicion: (position, callback) => {
        const query = 'SELECT * FROM clientes LIMIT 1 OFFSET ?';
        db.query(query, [position - 1], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    // Crear un nuevo cliente
    crearCliente: (clienteData, callback) => {
        const query = 'INSERT INTO clientes ( nombre, apellido, email, telefono, direccion, estado_civil, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const valores = [
            clienteData.nombre,
            clienteData.apellido,
            clienteData.email,
            clienteData.telefono,
            clienteData.direccion,
            clienteData.estado_civil,
            clienteData.estado
        ];

        db.query(query, valores, (err, result) => {
            if (err) return callback(err);
            callback(null, { cliente_id: result.insertId });
        });
    },

    // Actualizar un cliente
    actualizarCliente: (cliente, callback) => {
        const { cliente_id, nombre, apellido, email, telefono, direccion, estado_civil, estado } = cliente;
        const query = `UPDATE clientes SET nombre = ?, apellido = ?, email = ?, telefono = ?, direccion = ?, 
                       estado_civil = ?, estado = ? WHERE cliente_id = ?`;
        db.query(query, [nombre, apellido, email, telefono, direccion, estado_civil, estado, cliente_id], (err, results) => {
            if (err) return callback(err);
            callback(null, { message: 'Cliente actualizado' });
        });
    },

    // Eliminar un cliente
    eliminarCliente: (cliente_id, callback) => {
        const query = 'DELETE FROM clientes WHERE cliente_id = ?';
        db.query(query, [cliente_id], (err, results) => {
            if (err) return callback(err);
            callback(null, { message: 'Cliente eliminado' });
        });
    }
};

module.exports = Cliente;
