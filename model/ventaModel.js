const db = require('../config/db');

const Venta = {
    crearVenta: ({ nit, factura_id, inventario_id, cantidad, subtotal, total_venta }, callback) => {
        const query = `INSERT INTO ventas (nit, factura_id, inventario_id, cantidad, subtotal, total_venta) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(query, [nit, factura_id, inventario_id, cantidad, subtotal, total_venta], callback);
    }
};

module.exports = Venta;
