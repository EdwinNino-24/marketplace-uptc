const getService = require('../services/getService');


exports.sendCategories = async (res) => {
    try {
        const categories = await getService.getCategories();
        res.json(categories);
    } catch (error) {
    }
};

exports.sendLocations = async (res) => {
    try {
        const locations = await getService.getLocations();
        res.json(locations);
    } catch (error) {
    }
};

exports.sendStates = async (res) => {
    try {
        const states = await getService.getStates();
        res.json(states);
    } catch (error) {
    }
};

exports.sendTypesOffer = async (res) => {
    try {
        const typesOffer = await getService.getTypesOffer();
        res.json(typesOffer);
    } catch (error) {
    }
};