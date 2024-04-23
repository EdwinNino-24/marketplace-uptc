const bcrypt = require('bcrypt');

// Función para generar el hash de la contraseña
async function hashCode(password) {
    const saltRounds = 10; // Puedes ajustar el número de rondas según las necesidades de seguridad y rendimiento
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

// Función para verificar la contraseña contra un hash almacenado
async function checkCode(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Exportar las funciones para usar en otros archivos
module.exports = {
    hashCode,
    checkCode
};
