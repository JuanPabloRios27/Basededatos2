
const express = require('express');
const router = express.Router();
const Producto = require('../model/productoModel');

router.post('/create', (req, res) => {
    const { proveedor_id, nombre_producto, descripcion, precio_unitario, fecha_vencimiento, codigo_barras } = req.body;

   
    console.log('Datos recibidos para crear producto:', req.body);

    Producto.crearProducto({ proveedor_id, nombre_producto, descripcion, precio_unitario, fecha_vencimiento, codigo_barras }, (err, result) => {
        if (err) {
            console.error('Error al crear el producto:', err.message); 
            return res.status(500).json({ error: 'Error al crear el producto: ' + err.message });
        }
        res.json({ message: 'Producto creado exitosamente', producto: result });
    });
});

module.exports = router;
