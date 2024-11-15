const express = require('express');
const router = express.Router();
const Proveedor = require('../model/proveedorModel');


router.post('/create', (req, res) => {
    const { nombre, contacto, telefono, direccion } = req.body;

    Proveedor.crearProveedor({ nombre, contacto, telefono, direccion }, (err, result) => {
        if (err) {
            console.error('Error al crear el proveedor:', err.message);
            return res.status(500).json({ error: 'Error al crear el proveedor: ' + err.message });
        }
        res.json({ message: 'Proveedor creado exitosamente', proveedor: result });
    });
});


router.get('/busc', (req, res) => {
    Proveedor.obtenerProveedores((err, proveedores) => {
        if (err) {
            console.error('Error al obtener proveedores:', err.message);
            return res.status(500).json({ error: 'Error al obtener proveedores' });
        }
        res.json(proveedores);
    });
});

module.exports = router;