const { queryDatabase } = require('../utils/dbUtils.js');


exports.fetchPost = async (id) => {
  const query = `
    SELECT
        P.ID_PUBLICATION,
        O.ID_OFFER,
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
        P.ID_STATE,
        S.NAME_STATE,
        O.ID_TYPE,
        P.ID_CATEGORY,
        P.ID_LOCATION
        FROM PUBLICATIONS P
        JOIN OFFERS O ON P.ID_OFFER = O.ID_OFFER
        JOIN TYPES_OFFERS T ON O.ID_TYPE = T.ID_TYPE
        JOIN CATEGORIES C ON P.ID_CATEGORY = C.ID_CATEGORY
        JOIN LOCATIONS L ON P.ID_LOCATION = L.ID_LOCATION
        JOIN STATES S ON P.ID_STATE = S.ID_STATE
        WHERE ID_PUBLICATION = ?;
    `;
  const result = await queryDatabase(query, id);
  return result[0];
};

exports.updateStatePost = async (postId, newState) => {
  const updateQuery = `UPDATE PUBLICATIONS SET ID_STATE = ?, UPDATE_DATE = NOW() WHERE ID_PUBLICATION = ?;`;

  try {
    const result = await queryDatabase(updateQuery, [newState, postId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

exports.createPost = async (offer, post, user) => {
  const queryOffer = `INSERT INTO OFFERS (ID_TYPE, NAME_OFFER, DESCRIPTION_OFFER, URL_IMAGE_OFFER, PRICE_OFFER) VALUES (?, ?, ?, ?, ?)`;
  const queryPublication = `INSERT INTO PUBLICATIONS 
                   (ID_OFFERER, ID_CATEGORY, ID_LOCATION, ID_OFFER, ID_STATE, CREATION_DATE, UPDATE_DATE)
                   VALUES (?, ?, ?, ?, 1, NOW(), NOW())`;
  try {
    const resultOffer = await queryDatabase(queryOffer, [offer.typeId, offer.name, offer.description, "", offer.price]);
    const idOffer = resultOffer.insertId;
    const resultPublication = await queryDatabase(queryPublication, [user, post.category, post.location, idOffer]);
    return [resultOffer.affectedRows > 0 && resultPublication.affectedRows > 0, idOffer];
  } catch (error) {
    console.error('Error updating user profile:', error);
    return [false];
  }
};

exports.updatePost = async (offerId, publicationId, post) => {
  const offerQuery = `UPDATE OFFERS SET ID_TYPE = ?, NAME_OFFER = ?, DESCRIPTION_OFFER = ?, PRICE_OFFER = ? WHERE ID_OFFER = ?`;
  const publicationQuery = `UPDATE PUBLICATIONS SET ID_CATEGORY = ?, ID_LOCATION = ?, UPDATE_DATE = NOW(), ID_STATE = 1 
  WHERE ID_PUBLICATION = ?`;

  try {
    const resultOffer = await queryDatabase(offerQuery, [post.type, post.title, post.description, post.price, offerId]);
    const resultPublication = await queryDatabase(publicationQuery, [post.category, post.location, publicationId]);
    return resultOffer.affectedRows > 0 && resultPublication.affectedRows > 0;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};