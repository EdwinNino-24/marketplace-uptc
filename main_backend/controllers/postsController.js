const postsServices = require('../services/postsServices');
const userService = require('../services/usersService');


exports.sendProductPosts = async (res) => {
    try {
        const results = await postsServices.getProductsPosts();
        res.json(results);
    } catch (error) {
    }
};

exports.sendServicesPosts = async (res) => {
    try {
        const results = await postsServices.getServicesPosts();
        res.json(results);
    } catch (error) {
    }
};

exports.sendSearchedPosts = async (search, res) => {
    try {
        const results = await postsServices.getSearchedPosts(search);
        res.json(results);
    } catch (error) {
    }
};

exports.sendMyPosts = async (token, res) => {
    const user = await userService.getUserFromToken(token);
    try {
        const results = await postsServices.getMyPosts(user);
        res.json(results);
    } catch (error) {
    }
};