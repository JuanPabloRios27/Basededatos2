// ventasModel.js
const db = require('../config/db');

const Ventas = {
    // Método para buscar un producto por código de barras
    buscarPorCodigoBarras: (codigoBarras, callback) => {
        const query = `
            SELECT p.producto_id, p.nombre_producto, p.codigo_barras, p.precio_unitario, i.cantidad_disponible
            FROM productos p
            JOIN inventario i ON p.producto_id = i.producto_id
            WHERE p.codigo_barras = ?
        `;

        db.query(query, [codigoBarras], (err, results) => {
            if (err) {
                console.error('Error en la consulta de búsqueda:', err);
                return callback(err, null);
            }
            // Verifica si se encontró el producto
            if (results.length === 0) {
                return callback(new Error('Producto no encontrado'), null);
            }
            callback(null, results[0]);
        });
    }
};

module.exports = Ventas;
