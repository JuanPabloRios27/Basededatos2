// config/db.js
const mysql = require('mysql2');
//Configuración de MySQL.
const mysqlDb = mysql.createConnection({
    host: 'localhost',          // Cambia según la configuración de tu base de datos
    user: 'root',               // Cambia según el nombre de usuario de tu base de datos
    password: '',     // Cambia según la contraseña de tu base de datos
    database: 'drogueria'       // Nombre de tu base de datos
});
mysqlDb.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos  MySQL de JP:', err);
        return;
    }
    console.log('Conectado a la base de datos de MYSQL de JP.');
});
module.exports = mysqlDb;
