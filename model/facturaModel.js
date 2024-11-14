const db = require('../config/db');

const Factura = {
    crearFactura: ({ cliente_id, fecha, fecha_realizada }, callback) => {
        const query = `INSERT INTO factura (fecha, fecha_realizada, cliente_id) VALUES (?, ?, ?)`;
        db.query(query, [fecha, fecha_realizada, cliente_id], (err, result) => {
            if (err) return callback(err);
            callback(null, result.insertId);
        });
    }
};

module.exports = Factura;
