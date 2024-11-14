const express = require('express');
const router = express.Router();
const Factura = require('../model/facturaModel');

router.post('/crear', (req, res) => {
    const { cliente_id, fecha, fecha_realizada } = req.body;
    Factura.crearFactura({ cliente_id, fecha, fecha_realizada }, (err, facturaId) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ factura_id: facturaId });
    });
});

module.exports = router;
