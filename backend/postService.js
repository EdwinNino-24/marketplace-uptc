const { queryDatabase } = require('./databaseService.js');
const { decodedToken } = require('./jwtService.js');
const { fetchRandomImages } = require('./imageHandler.js');

async function insertOffer(offer, post, decoded, res) {
    const query = `INSERT INTO OFFERS (ID_TYPE, NAME_OFFER, DESCRIPTION_OFFER, URL_IMAGE_OFFER, PRICE_OFFER) VALUES (?, ?, ?, ?, ?)`;
    try {
        const result = await queryDatabase(query, [offer.typeId, offer.name, offer.description, "", offer.price]);
        console.log("Oferta insertada con ID:", result.insertId);
        console.log(result.insertId);

        insertPublication(post, result.insertId, decoded, res);
    } catch (error) {
        console.error("Error al insertar la oferta:", error);
        throw error; // Propagar el error para manejo externo
    }
}

async function insertPublication(post, offerId, decoded, res) {
    try {
        await fetchRandomImages();
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las imágenes aleatorias de las publicaciones' });
    }
    console.log(offerId);
    const query = `INSERT INTO PUBLICATIONS 
                   (ID_OFFERER, ID_CATEGORY, ID_LOCATION, ID_OFFER, CREATION_DATE, UPDATE_DATE, STATE_PUBLICATION)
                   VALUES (?, ?, ?, ?, NOW(), NOW(), 'Disponible')`;
    await queryDatabase(query, [decoded, post.category, post.location, offerId]);
    res.json({ id_post: offerId });
}

async function insertPost(post, res) {

    const decoded = decodedToken(post.token); // Asumiendo que decodeToken es una función que ya tienes

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

    // Primero insertamos la oferta y luego la publicación
    insertOffer(offer, post, decoded, res);
}


module.exports = { insertPost };