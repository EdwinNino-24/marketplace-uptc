const getModel = require('../models/getModel');


exports.getCategories = async () => {
    const categories = await getModel.fetchCategories();
    return categories;
};

exports.getLocations = async () => {
    const locations = await getModel.fetchLocations();
    return locations;
};

exports.getStates = async () => {
    const states = await getModel.fetchStates();
    return states;
};

exports.getTypesOffer = async () => {
    const typesOffer = await getModel.fetchTypesOffer();
    return typesOffer;
};