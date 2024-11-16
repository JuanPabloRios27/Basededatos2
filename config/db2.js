const {Pool} = require('pg');
//Configuración de PostgreSQL.
const PostgrePool = new Pool({
    user: 'postgres', //Hace lo mismo que con MySQL, solo que ahora debemos conectarlo al PostGres.
    host: 'localhost', //TODO -- Verificar toda la información de la base de datos POSTGRES.
    database: 'Usuarios',
    password: 'zurich1972',
    prot: 5432,
});
PostgrePool.connect((err,cliente,release) => {
    if (err) {
        console.error('Error al conectar a la base de datos PostGres de JP:', err);
        return;
    }
    console.log('Conectado a la base de datos Postgres de JP.');
    release();
});
module.exports = PostgrePool;