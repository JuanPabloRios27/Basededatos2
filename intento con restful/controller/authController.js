const User = require('../model/userModel');

const authController = {
    login: (req, res) => {
        const { username, password } = req.body;

        User.findByUsername(username, (err, user) => {
            if (err) return res.status(500).json({ message: 'Error en el servidor' });
            if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

            // Verificación de contraseña sin encriptación
            if (user.contrasena !== password) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            // Autenticación exitosa
            res.status(200).json({ message: 'Inicio de sesión exitoso' });
        });
    }
};

module.exports = authController;