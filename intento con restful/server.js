const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clienteRoutes');
const invRoutes = require('./routes/invRoutes');
const productoRoute = require('./routes/productRoutes');
const proveedorRoute = require('./routes/proveedorRoutes');
const ventasRoute = require('./routes/ventaRoutes');
const ventaRoute = require('./routes/ventasRoutes');
const facturasRoutes = require('./routes/facturasRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));


app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientRoutes);
app.use('/api/inventario', invRoutes);
app.use('/api/productos', productoRoute);
app.use('/api/proveedores', proveedorRoute);
app.use('/api/ventas', ventasRoute);
app.use('/api/venta', ventaRoute);
app.use('/api/facturas', facturasRoutes);
app.use('/api/reporte', reporteRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
