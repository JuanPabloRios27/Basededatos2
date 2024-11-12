// config/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',     // Cambia según la configuración de tu base de datos
    user: 'root',          // Cambia según el nombre de usuario de tu base de datos
    password: 'Juan_30012',          // Cambia según la contraseña de tu base de datos
    database: 'papeleria' // Nombre de tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos.');
});

module.exports = db;
