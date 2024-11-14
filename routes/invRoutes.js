const express = require('express');
const router = express.Router();
const Inventario = require('../model/inventarioModel');

router.get('/buscar', (req, res) => {
    const { buscar = '', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    Inventario.buscarProductos(buscar, limit, offset, (err, items, total) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ items, total });
    });
});

router.put('/actualizar', (req, res) => {
    const { inventario_id, cantidad } = req.body;
    Inventario.actualizarStock(inventario_id, cantidad, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Inventario actualizado' });
    });
});


module.exports = router;
