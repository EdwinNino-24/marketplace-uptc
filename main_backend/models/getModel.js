const { queryDatabase } = require('../utils/dbUtils.js');


async function get(query) {
    let results = [];
    try {
        results = await queryDatabase(query);
    } catch (error) {
    }
    return results;
}

exports.fetchCategories = async () => {
    const query = 'SELECT * FROM CATEGORIES;';
    const categories = await get(query);
    return categories;
};

exports.fetchLocations = async () => {
    const query = 'SELECT * FROM LOCATIONS;';
    const locations = await get(query);
    return locations;
};

exports.fetchStates = async () => {
    const query = 'SELECT * FROM STATES;';
    const states = await get(query);
    return states;
};

exports.fetchTypesOffer = async () => {
    const query = 'SELECT * FROM TYPES_OFFERS;';
    const typesOffer = await get(query);
    return typesOffer;
};