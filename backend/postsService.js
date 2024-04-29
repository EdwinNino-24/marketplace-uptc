const { queryDatabase } = require('./databaseService.js');
const { decodedToken } = require('./jwtService.js');

function getPublications(res) {
    const query = 'SELECT * FROM publications';
    queryDatabase(query, (error, results) => {
        if (error) {
            console.error('Error al obtener las publicaciones:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results); // Envía las publicaciones como respuesta
    });
}

function getProductsPosts(req, res) {
    const query = `
        SELECT
            P.ID_PUBLICATION,
            O.NAME_OFFER,
            O.DESCRIPTION_OFFER,
            O.URL_IMAGE_OFFER,
            O.PRICE_OFFER,
            T.NAME_TYPE AS OFFER_TYPE,
            C.NAME_CATEGORY,
            L.NAME_LOCATION,
            P.ID_OFFERER,
            P.CREATION_DATE,
            P.UPDATE_DATE,
            P.STATE_PUBLICATION
        FROM PUBLICATIONS P
        JOIN OFFERS O ON P.ID_OFFER = O.ID_OFFER
        JOIN TYPES_OFFERS T ON O.ID_TYPE = T.ID_TYPE
        JOIN CATEGORIES C ON P.ID_CATEGORY = C.ID_CATEGORY
        JOIN LOCATIONS L ON P.ID_LOCATION = L.ID_LOCATION
        WHERE T.ID_TYPE = 1;
    `;
    queryDatabase(query, (error, results) => {
        if (error) {
            console.error('Error al obtener las publicaciones:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        console.log(results);
        res.json(results); // Envía las publicaciones como respuesta
    });
}

function getServicesPosts(req, res) {
    const query = `
        SELECT
            P.ID_PUBLICATION,
            O.NAME_OFFER,
            O.DESCRIPTION_OFFER,
            O.URL_IMAGE_OFFER,
            O.PRICE_OFFER,
            T.NAME_TYPE AS OFFER_TYPE,
            C.NAME_CATEGORY,
            L.NAME_LOCATION,
            P.ID_OFFERER,
            P.CREATION_DATE,
            P.UPDATE_DATE,
            P.STATE_PUBLICATION
        FROM PUBLICATIONS P
        JOIN OFFERS O ON P.ID_OFFER = O.ID_OFFER
        JOIN TYPES_OFFERS T ON O.ID_TYPE = T.ID_TYPE
        JOIN CATEGORIES C ON P.ID_CATEGORY = C.ID_CATEGORY
        JOIN LOCATIONS L ON P.ID_LOCATION = L.ID_LOCATION
        WHERE T.ID_TYPE = 2;
    `;
    queryDatabase(query, (error, results) => {
        if (error) {
            console.error('Error al obtener las publicaciones:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        console.log(results);
        res.json(results); // Envía las publicaciones como respuesta
    });
}

function getPublication(req, res) {
    const id = req.params.id; // Obtener el ID de la URL
    // Consulta SQL para buscar la publicación por su ID en la tabla PUBLICATIONS
    const query = `
        SELECT
            P.ID_PUBLICATION,
            O.NAME_OFFER,
            O.DESCRIPTION_OFFER,
            O.URL_IMAGE_OFFER,
            O.PRICE_OFFER,
            T.NAME_TYPE AS OFFER_TYPE,
            C.NAME_CATEGORY,
            L.NAME_LOCATION,
            P.ID_OFFERER,
            P.CREATION_DATE,
            P.UPDATE_DATE,
            P.STATE_PUBLICATION
        FROM PUBLICATIONS P
        JOIN OFFERS O ON P.ID_OFFER = O.ID_OFFER
        JOIN TYPES_OFFERS T ON O.ID_TYPE = T.ID_TYPE
        JOIN CATEGORIES C ON P.ID_CATEGORY = C.ID_CATEGORY
        JOIN LOCATIONS L ON P.ID_LOCATION = L.ID_LOCATION
        WHERE ID_PUBLICATION = ${id};
    `;
    // Ejecutar la consulta
    queryDatabase(query, (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error al buscar la publicación' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Publicación no encontrada' });
            return;
        }

        const publication = results[0];
        res.json(publication); // Enviar los detalles de la publicación como respuesta en formato JSON
    });
}

async function getMyPosts(req, res) {
    const token = req.body.token;
    const user = decodedToken(token);
    const query = `
    SELECT
            P.ID_PUBLICATION,
            O.NAME_OFFER,
            O.DESCRIPTION_OFFER,
            O.URL_IMAGE_OFFER,
            O.PRICE_OFFER,
            T.NAME_TYPE AS OFFER_TYPE,
            C.NAME_CATEGORY,
            L.NAME_LOCATION,
            P.ID_OFFERER,
            P.CREATION_DATE,
            P.UPDATE_DATE,
            P.STATE_PUBLICATION
        FROM PUBLICATIONS P
        JOIN OFFERS O ON P.ID_OFFER = O.ID_OFFER
        JOIN TYPES_OFFERS T ON O.ID_TYPE = T.ID_TYPE
        JOIN CATEGORIES C ON P.ID_CATEGORY = C.ID_CATEGORY
        JOIN LOCATIONS L ON P.ID_LOCATION = L.ID_LOCATION
        WHERE ID_OFFERER = ?;
    `;
    const results = await queryDatabase(query, [user]);
    console.log(results);
    res.json(results); 
}

module.exports = { getPublication, getPublications, getProductsPosts, getServicesPosts, getMyPosts };