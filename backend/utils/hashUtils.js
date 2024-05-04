const bcrypt = require('bcrypt');

async function hashCode(password) {
    const saltRounds = 10; 
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

async function checkCode(password, hash) {
    return await bcrypt.compare(password, hash);
}

async function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return await result;
}

module.exports = {
    hashCode,
    checkCode,
    generateRandomCode
};
