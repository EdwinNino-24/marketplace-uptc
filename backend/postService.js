const { queryDatabase } = require('./databaseService.js');
const { decodedToken } = require('./jwtService.js');

async function insertOffer(offer, post, decoded, res) {
    const query = `INSERT INTO OFFERS (ID_TYPE, NAME_OFFER, DESCRIPTION_OFFER, URL_IMAGE_OFFER, PRICE_OFFER) VALUES (?, ?, ?, ?, ?)`;
    try {
        const result = await queryDatabase(query, [offer.typeId, offer.name, offer.description, "", offer.price]);

        await insertPublication(post, result.insertId, decoded, res);
    } catch (error) {
        console.error("Error al insertar la oferta:", error);
        throw error;
    }
}

async function insertPublication(post, offerId, decoded, res) {
    const query = `INSERT INTO PUBLICATIONS 
                   (ID_OFFERER, ID_CATEGORY, ID_LOCATION, ID_OFFER, CREATION_DATE, UPDATE_DATE, STATE_PUBLICATION)
                   VALUES (?, ?, ?, ?, NOW(), NOW(), 'Disponible')`;
    await queryDatabase(query, [decoded, post.category, post.location, offerId]);
    res.json({ id_post: offerId });
}

async function insertPost(post, res) {

    const decoded = decodedToken(post.token);

    if (!decoded) {
        res.status(400).json({ error: 'Token inválido' });
        return;
    }

    const offer = {
        typeId: post.type,
        name: post.title,
        description: post.description,
        imageUrl: "",
        price: post.price
    };

    insertOffer(offer, post, decoded, res);

}


async function editPost(req, res) {
    const decoded = decodedToken(req.body.token);
    if (!decoded) {
        return res.status(400).json({ error: 'Token inválido' });
    }

    const post = {
        id: req.body.id,
        title: req.body.title,
        type: req.body.type,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
    };

    const publicationQuery = `
        SELECT P.ID_PUBLICATION, O.ID_OFFER
        FROM PUBLICATIONS P
        JOIN OFFERS O ON P.ID_OFFER = O.ID_OFFER
        WHERE P.ID_PUBLICATION = ?;
    `;

    try {
        const results = await queryDatabase(publicationQuery, [post.id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }

        const publication = results[0];
        await editOffer(publication, post);
        await editPublication(post);
        res.json({ message: "ok" });
    } catch (error) {
        console.error('Error en la edición:', error);
        res.status(500).json({ error: 'Error al actualizar la publicación y la oferta' });
    }
}

async function editOffer(publication, post) {
    const offerQuery = `UPDATE OFFERS SET ID_TYPE = ?, NAME_OFFER = ?, DESCRIPTION_OFFER = ?, PRICE_OFFER = ? WHERE ID_OFFER = ?`;
    await queryDatabase(offerQuery, [post.type, post.title, post.description, post.price, publication.ID_OFFER]);
}

async function editPublication(post) {
    const publicationQuery = `UPDATE PUBLICATIONS SET ID_CATEGORY = ?, ID_LOCATION = ?, UPDATE_DATE = NOW(), STATE_PUBLICATION = 'Disponible' WHERE ID_PUBLICATION = ?`;
    await queryDatabase(publicationQuery, [post.category, post.location, post.id]);
}




module.exports = { insertPost, editPost };