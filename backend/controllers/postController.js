const postServices = require('../services/postServices');
const userService = require('../services/usersService');


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

exports.createPost = async (post, res) => {
    try {
        const user = await userService.getUserFromToken(post.token);
        const offer = {
            typeId: post.type,
            name: post.title,
            description: post.description,
            imageUrl: "",
            price: post.price
        };
        const result = await postServices.insertPost(offer, post, user);
        if (result[0]) {
            res.json({ code: 0, id_post: result[1] });
        } else {
            res.json({ code: 1 });
        }
    } catch (error) {
    }
};

exports.updatePost = async (token, newData, res) => {
    try {
        const user = await userService.getUserFromToken(token);
        const post = await postServices.getPost(newData.id);
        if (post.ID_OFFERER !== user) {
            res.json({ code: 0 });
        }
        else {
            const update = await postServices.updatePost(post.ID_OFFER, post.ID_PUBLICATION, newData);
            if (update) {
                res.json({ code: 2 });
            } else {
                res.json({ code: 1 });
            }
        }
    } catch (error) {
    }
};