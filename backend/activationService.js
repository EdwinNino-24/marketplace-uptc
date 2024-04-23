const { queryDatabase } = require('./databaseService.js');
const { decodedToken } = require('./jwtService.js');
const { checkCode } = require('./hashService.js');

async function activateAccount(req, res) {
    const user = decodedToken(req.body.token);
    console.log(user);
    console.log(req.numericValue);
    try {
        // Primero, recuperamos la entrada de la base de datos basada en el ID del usuario o algún otro identificador si es necesario
        const results = await queryDatabase('SELECT * FROM ACCOUNTS WHERE ID_ACCOUNT = ?', [user]); // Asumimos que puedes identificar al usuario de alguna manera
        if (results.length === 0) {
            console.log('Usuario no encontrado');
            //res.send("0");
            return;
        }

        const usuarioEncontrado = results[0];

        // Aquí se verifica el código utilizando verifyCode
        const isValidCode = await checkCode(req.body.code, usuarioEncontrado.CODE_CONFIRMATION_HASHED);
        if (!isValidCode) {
            console.log('Código de activación inválido');
            const token = jwt.sign({ username: email, sesion: false, activate: false }, '2404');
            res.json({ user: email, code: "0", token: token});
            return;
        }

        // Si el código es correcto, actualizamos el estado de la cuenta
        const updateResults = await queryDatabase('UPDATE ACCOUNTS SET STATE_ACCOUNT = TRUE WHERE ID_ACCOUNT = ?', [usuarioEncontrado.ID_ACCOUNT]);
        if (updateResults.affectedRows === 0) {
            console.error('No se actualizó ningún registro, posible error en los datos.');
            res.status(500).json({ message: 'Error al activar la cuenta, no se encontró el registro correspondiente.' });
        } else {
            console.log('Cuenta activada exitosamente');
            const token = jwt.sign({ username: email, sesion: true, activate: true }, '2404');
            res.json({ user: email, code: "1", token: token});
        }
    } catch (err) {
        console.error('Error durante la activación de la cuenta:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}


module.exports = { activateAccount };