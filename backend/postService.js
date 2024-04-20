const { queryDatabase } = require('./databaseService.js');
const { decodedToken } = require('./jwtService.js');

function insertPost(post, res) {
    console.log(post.token);
    const decoded = decodedToken(post.token);

    if (!decoded) {
        const error = new Error('No se pudo decodificar el token');
        console.error('Error al decodificar el token:', error);
        callback(error, null);
        return;
    }

    const userId = decoded;

    const query = `INSERT INTO PUBLICATIONS 
                  (ID_USER_SELLER, CREATION_DATE_PUBLICATION, UPDATE_DATE_PUBLICATION, TITLE_PUBLICATION, URL_IMAGE_PUBLICATION, STATE_PUBLICATION, TYPE_PUBLICATION, CATEGORY_PUBLICATION, DESCRIPTION_PUBLICATION, SELLER_LOCATION, PRICE_PUBLICATION) 
                  VALUES (?, NOW(), NOW(), ?, '', 'DISPONIBLE', ?, ?, ?, ?, ?)`;

    queryDatabase(query, [userId, post.title, post.type, post.category, post.description, post.location, post.price], (error, results, fields) => {
        if (error) {
            console.error('Error al insertar el registro:', error);
            callback(error, null);
        } else {
            console.log('Registro insertado correctamente');
            const lastInsertedId = results.insertId;
            res.json({ id_post: lastInsertedId});
        }
    });
};

module.exports = { insertPost };