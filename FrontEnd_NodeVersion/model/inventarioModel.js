const db = require('../config/db');

const Inventario = {
    buscarProductos: (searchTerm, limit, offset, callback) => {
        const queryData = `
            SELECT inventario.inventario_id, inventario.producto_id, productos.nombre_producto AS nombre, productos.descripcion, inventario.cantidad_disponible
            FROM inventario
            JOIN productos ON inventario.producto_id = productos.producto_id
            WHERE productos.nombre_producto LIKE ?
            LIMIT ? OFFSET ?
        `;

        const queryCount = `
            SELECT COUNT(*) AS total
            FROM inventario
            JOIN productos ON inventario.producto_id = productos.producto_id
            WHERE productos.nombre_producto LIKE ?
        `;

        db.query(queryCount, [`%${searchTerm}%`], (err, countResults) => {
            if (err) return callback(err);

            const total = countResults[0].total;

            db.query(queryData, [`%${searchTerm}%`, parseInt(limit), parseInt(offset)], (err, dataResults) => {
                if (err) return callback(err);
                callback(null, dataResults, total);
            });
        });
    }
};

module.exports = Inventario;