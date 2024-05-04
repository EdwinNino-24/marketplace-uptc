const postModel = require('../models/postModel.js');
const { bucket } = require('../firebaseConfig.js');


exports.getPost = async (id) => {
    const result = await postModel.fetchPost(id);
    return result;
};

exports.getImages = async (id) => {
    try {
        const [files] = await bucket.getFiles({ prefix: id });
        const urls = await Promise.all(
            files.map(async (file) => {
                const [url] = await file.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2500',
                });
                return url;
            })
        );
        return { image: urls };
    } catch (error) {
        console.error('Error fetching images:', error);
    }
    return { image: [] };
};

exports.updateState = async (id, state) => {
    try {
        postModel.updateStatePost(id, state);
    } catch (error) {
    }
}
