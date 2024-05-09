const { queryDatabase } = require('../utils/dbUtils.js');


async function get(query) {
    let results = [];
    try {
        results = await queryDatabase(query);
    } catch (error) {
    }
    return results;
}

exports.fetchProducts = async () => {
    const query = `SELECT
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
    S.NAME_STATE
    FROM PUBLICATIONS P
    JOIN OFFERS O ON P.ID_OFFER = O.ID_OFFER
    JOIN TYPES_OFFERS T ON O.ID_TYPE = T.ID_TYPE
    JOIN CATEGORIES C ON P.ID_CATEGORY = C.ID_CATEGORY
    JOIN LOCATIONS L ON P.ID_LOCATION = L.ID_LOCATION
    JOIN STATES S ON P.ID_STATE = S.ID_STATE
    WHERE T.ID_TYPE = 1 AND P.VISIBILITY_POST = TRUE
    ORDER BY P.UPDATE_DATE DESC;`;
    const results = await get(query);
    return results;
};

exports.fetchServices = async () => {
    const query = `SELECT
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
    S.NAME_STATE
    FROM PUBLICATIONS P
    JOIN OFFERS O ON P.ID_OFFER = O.ID_OFFER
    JOIN TYPES_OFFERS T ON O.ID_TYPE = T.ID_TYPE
    JOIN CATEGORIES C ON P.ID_CATEGORY = C.ID_CATEGORY
    JOIN LOCATIONS L ON P.ID_LOCATION = L.ID_LOCATION
    JOIN STATES S ON P.ID_STATE = S.ID_STATE
    WHERE T.ID_TYPE = 2 AND P.VISIBILITY_POST = TRUE
    ORDER BY P.UPDATE_DATE DESC;`;
    const results = await get(query);
    return results;
};

exports.fetchSearch = async (search) => {
    const likeString = '%' + search + '%';
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
    S.NAME_STATE
    FROM PUBLICATIONS P
    JOIN OFFERS O ON P.ID_OFFER = O.ID_OFFER
    JOIN TYPES_OFFERS T ON O.ID_TYPE = T.ID_TYPE
    JOIN CATEGORIES C ON P.ID_CATEGORY = C.ID_CATEGORY
    JOIN LOCATIONS L ON P.ID_LOCATION = L.ID_LOCATION
    JOIN STATES S ON P.ID_STATE = S.ID_STATE
    WHERE
    (O.NAME_OFFER LIKE ? OR 
    O.DESCRIPTION_OFFER LIKE ? OR 
    O.PRICE_OFFER LIKE ? OR 
    T.NAME_TYPE LIKE ? OR 
    C.NAME_CATEGORY LIKE ? OR
    L.NAME_LOCATION LIKE ?) AND P.VISIBILITY_POST = TRUE
    ORDER BY P.UPDATE_DATE DESC;
    `;
    const results = await queryDatabase(query, [likeString, likeString, likeString, likeString, likeString, likeString]);
    return results;
};

exports.fetchMyPosts = async (id) => {
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
            S.NAME_STATE
        FROM PUBLICATIONS P
        JOIN OFFERS O ON P.ID_OFFER = O.ID_OFFER
        JOIN TYPES_OFFERS T ON O.ID_TYPE = T.ID_TYPE
        JOIN CATEGORIES C ON P.ID_CATEGORY = C.ID_CATEGORY
        JOIN LOCATIONS L ON P.ID_LOCATION = L.ID_LOCATION
        JOIN STATES S ON P.ID_STATE = S.ID_STATE
        WHERE ID_OFFERER = ? AND P.VISIBILITY_POST = TRUE
        ORDER BY P.UPDATE_DATE DESC;
    `;
    const results = await queryDatabase(query, id);
    return results;
};