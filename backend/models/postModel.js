const { queryDatabase } = require('../utils/dbUtils.js');


exports.fetchPost = async (id) => {
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

