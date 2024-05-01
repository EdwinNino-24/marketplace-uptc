const bcrypt = require('bcrypt');

async function hashCode(password) {
    const saltRounds = 10; 
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

async function checkCode(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    hashCode,
    checkCode
};
