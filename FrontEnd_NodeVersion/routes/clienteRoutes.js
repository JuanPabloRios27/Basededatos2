
const express = require('express');
const router = express.Router();
const Cliente = require('../model/clienteModel');


router.get('/count', (req, res) => {
    Cliente.contarClientes((err, total) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ total });
    });
});


router.get('/get/:position', (req, res) => { 
    const position = parseInt(req.params.position);
    Cliente.obtenerClientePorPosicion(position, (err, cliente) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(cliente);
    });
});

router.delete('/delete/:id', (req, res) => {
    const clienteId = parseInt(req.params.id);
    Cliente.eliminarCliente(clienteId, (err, result) => {
        if (err) {
            console.error('Error al eliminar cliente:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cliente eliminado exitosamente' });
    });
});


router.post('/create', (req, res) => {
    const { nombre, apellido, email, telefono, direccion, estado_civil, estado } = req.body;

    console.log('Datos recibidos para crear cliente:', req.body);

    Cliente.crearCliente({ nombre, apellido, email, telefono, direccion, estado_civil, estado }, (err, result) => {
        if (err) {
            console.error('Error al crear cliente:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cliente creado exitosamente', cliente: result });
    });
});


router.put('/update/:id', (req, res) => {
    const clienteId = parseInt(req.params.id);
    const { nombre, apellido, email, telefono, direccion, estado_civil, estado } = req.body;

    Cliente.actualizarCliente({ cliente_id: clienteId, nombre, apellido, email, telefono, direccion, estado_civil, estado }, (err, result) => {
        if (err) {
            console.error('Error al actualizar cliente:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cliente actualizado exitosamente' });
    });
});

module.exports = router;
