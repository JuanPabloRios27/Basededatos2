
const express = require('express');
const router = express.Router();
const Ventas = require('../model/ventasModel');


router.get('/buscarPorCodigo', (req, res) => {
    const { codigo_barras } = req.query;

    Ventas.buscarPorCodigoBarras(codigo_barras, (err, producto) => {
        if (err) {
            console.error('Error al buscar el producto:', err.message);
            return res.status(404).json({ error: 'Producto no encontrado o stock insuficiente' });
        }
        res.json(producto);
    });
});

module.exports = router;
