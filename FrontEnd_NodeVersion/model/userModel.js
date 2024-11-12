
const db = require('../config/db');

const User = {
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM usuarios WHERE nombre_usuario = ?';
        db.query(query, [username], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }
};

module.exports = User;
