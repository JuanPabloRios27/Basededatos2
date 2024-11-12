
const db = require('../config/db'); 

const Producto = {
 
    crearProducto: (productoData, callback) => {
        const query = `
            INSERT INTO productos (proveedor_id, nombre_producto, descripcion, precio_unitario, fecha_vencimiento, codigo_barras) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            productoData.proveedor_id,
            productoData.nombre_producto,
            productoData.descripcion,
            productoData.precio_unitario,
            productoData.fecha_vencimiento,
            productoData.codigo_barras
        ];

        db.query(query, valores, (err, result) => {
            if (err) {
                console.error('Error en la consulta de creación de producto:', err); // Muestra el error en consola
                return callback(err);
            }
            callback(null, { producto_id: result.insertId });
        });
    },

    obtenerProveedores: (callback) => {
        const query = 'SELECT proveedor_id, nombre FROM proveedores';
        db.query(query, (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Producto;
