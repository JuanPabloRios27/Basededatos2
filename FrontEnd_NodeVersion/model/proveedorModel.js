const db = require('../config/db');

const Proveedor = {
    crearProveedor: (proveedorData, callback) => {
        const query = `
            INSERT INTO proveedores (nombre, contacto, telefono, direccion) 
            VALUES (?, ?, ?, ?)
        `;
        const valores = [
            proveedorData.nombre,
            proveedorData.contacto,
            proveedorData.telefono,
            proveedorData.direccion
        ];

        db.query(query, valores, (err, result) => {
            if (err) {
                console.error('Error en la consulta de creación de proveedor:', err);
                return callback(err);
            }
            callback(null, { proveedor_id: result.insertId });
        });
    },
    obtenerProveedores: (callback) => {
        const query = 'SELECT proveedor_id, nombre FROM proveedores';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error en la consulta de obtención de proveedores:', err);
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Proveedor;
