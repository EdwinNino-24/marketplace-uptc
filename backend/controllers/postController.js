const postServices = require('../services/postServices');


exports.getPost = async (id, res) => {
    try {
        const result = await postServices.getPost(id);
        res.json(result);
    } catch (error) {
    }
};

exports.getImagesPost = async (id, res) => {
    try {
        const result = await postServices.getImages(id);
        res.json(result);
    } catch (error) {
    }
};

exports.updateStatePost = async (publicationId, newState, res) => {
    try {
        await postServices.updateState(publicationId, newState);
    } catch (error) {
    }
};