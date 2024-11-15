const express = require('express');
const router = express.Router();
const Venta = require('../model/ventaModel');

router.post('/crear', (req, res) => {
    const { factura_id, inventario_id, cantidad, subtotal, total_venta } = req.body;
    const nit = Math.floor(100 + Math.random() * 9000);  

    Venta.crearVenta({ nit, factura_id, inventario_id, cantidad, subtotal, total_venta }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Venta generada exitosamente' });
    });
});


module.exports = router;
