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
                   (ID_OFFERER, ID_CATEGORY, ID_LOCATION, ID_OFFER, ID_STATE, CREATION_DATE, UPDATE_DATE)
                   VALUES (?, ?, ?, ?, 1, NOW(), NOW())`;
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

    try {
        const publication = await fetchPublicationDetails(post.id);
        if (!publication) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }

        if (publication.ID_OFFERER !== decoded) {
            return res.status(403).json({ error: 'No autorizado para actualizar esta publicación' });
        }

        await editOffer(publication.ID_OFFER, post);
        await editPublication(publication.ID_PUBLICATION, post);
        res.json({ message: "Publicación actualizada correctamente" });
    } catch (error) {
        console.error('Error en la edición:', error);
        res.status(500).json({ error: 'Error al actualizar la publicación y la oferta' });
    }
}

async function fetchPublicationDetails(publicationId) {
    const publicationQuery = `
        SELECT P.ID_PUBLICATION, P.ID_OFFERER, O.ID_OFFER
        FROM PUBLICATIONS P
        JOIN OFFERS O ON P.ID_OFFER = O.ID_OFFER
        WHERE P.ID_PUBLICATION = ?;
    `;
    const results = await queryDatabase(publicationQuery, [publicationId]);
    return results.length > 0 ? results[0] : null;
}




async function updateStatePost(req, res) {
    const { publicationId, newState, token } = req.body;

    if (!publicationId || !newState || !token) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const user = decodedToken(token);
    if (!user) {
        return res.status(400).json({ error: 'Token inválido' });
    }

    try {
        const isAuthorized = await checkPublicationOwnership(publicationId, user);
        if (!isAuthorized) {
            return res.status(403).json({ error: 'No autorizado para actualizar esta publicación' });
        }

        const success = await updatePublicationState(publicationId, newState);
        if (!success) {
            return res.status(404).json({ error: 'No se pudo actualizar la publicación' });
        }

        res.json({ success: 'Publicación actualizada correctamente' });
    } catch (error) {
        console.error('Error en la edición:', error);
        res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
}

async function checkPublicationOwnership(publicationId, userId) {
    const query = 'SELECT ID_OFFERER FROM PUBLICATIONS WHERE ID_PUBLICATION = ?';
    const results = await queryDatabase(query, [publicationId]);

    if (results.length === 0) {
        return false;
    }

    return results[0].ID_OFFERER === userId;
}

async function updatePublicationState(publicationId, newState) {
    const updateQuery = 'UPDATE PUBLICATIONS SET ID_STATE = ?, UPDATE_DATE = NOW() WHERE ID_PUBLICATION = ?';
    const results = await queryDatabase(updateQuery, [newState, publicationId]);
    return results.affectedRows > 0;
}


module.exports = { insertPost, editPost, updateStatePost };