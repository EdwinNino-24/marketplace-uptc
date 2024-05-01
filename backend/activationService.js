const { queryDatabase } = require('./databaseService.js');
const { generateToken, decodedToken } = require('./jwtService.js');
const { checkCode } = require('./hashService.js');

async function activateAccount(req, res) {
    const user = decodedToken(req.body.token);

    if (!user) {
        console.error('Token inválido o expirado');
        return res.status(401).json({ message: 'Sesión no válida o expirada' });
    }

    try {
        const results = await queryDatabase('SELECT * FROM ACCOUNTS WHERE ID_ACCOUNT = ?', [user]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const usuarioEncontrado = results[0];

        if (!req.body.code) {
            return res.status(400).json({ message: 'Código de activación requerido' });
        }

        const isValidCode = await checkCode(req.body.code, usuarioEncontrado.CODE_CONFIRMATION_HASHED);
        if (!isValidCode) {
            const token = generateToken(user, false, false);
            return res.json({ user: user, code: "0", token: token });
        }

        const updateResults = await queryDatabase('UPDATE ACCOUNTS SET STATE_ACCOUNT = TRUE WHERE ID_ACCOUNT = ?', [user]);
        if (updateResults.affectedRows === 0) {
            return res.status(500).json({ message: 'Error al activar la cuenta, no se encontró el registro correspondiente.' });
        } 

        const token = generateToken(user, true, true);
        res.json({ code: "1", token: token });
    } catch (err) {
        console.error('Error durante la activación de la cuenta:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = { activateAccount };