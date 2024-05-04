const postsModel = require('../models/postsModel');
const imageHandler = require('../imageHandler.js');


exports.getProductsPosts = async () => {
    await imageHandler.fetchRandomImages();
    const result = await postsModel.fetchProducts();
    return result;
};

exports.getServicesPosts = async () => {
    await imageHandler.fetchRandomImages();
    const result = await postsModel.fetchServices();
    return result;
};

exports.getSearchedPosts = async (search) => {
    await imageHandler.fetchRandomImages();
    const result = await postsModel.fetchSearch(search);
    return result;
};

exports.getMyPosts = async (id) => {
    await imageHandler.fetchRandomImages();
    const result = await postsModel.fetchMyPosts(id);
    return result;
};