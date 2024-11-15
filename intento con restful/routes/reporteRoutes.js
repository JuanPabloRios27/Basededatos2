const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.get('/facturas', (req, res) => {
   
    const fechaActual = new Date().toISOString().slice(0, 10);

    const query = `
        SELECT 
            f.factura_id AS numero_factura,
            p.nombre_producto AS producto,
            c.nombre AS cliente,
            v.cantidad AS cajas,
            v.cantidad AS unidad,
            v.total_venta AS total_producto
        FROM factura f
        JOIN ventas v ON f.factura_id = v.factura_id
        JOIN inventario i ON v.inventario_id = i.inventario_id
        JOIN productos p ON i.producto_id = p.producto_id
        JOIN clientes c ON f.cliente_id = c.cliente_id
        WHERE f.fecha = ?
    `;

    db.query(query, [fechaActual], (err, results) => {
        if (err) {
            console.error('Error al obtener el reporte:', err);
            return res.status(500).json({ error: 'Error al obtener el reporte' });
        }
        res.json(results);
    });
});

module.exports = router;
