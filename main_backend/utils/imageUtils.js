const { queryDatabase } = require('../utils/dbUtils.js');
const { bucket } = require('../firebaseConfig.js');


async function fetchRandomImages() {
    try {
        const publications = await fetchPublications();
        const randomImages = await Promise.all(
            publications.map(async (publication) => {
                const folderPath = publication.ID_OFFER;
                const [files] = await bucket.getFiles({ prefix: folderPath });
                if (files.length > 0) {
                    const randomIndex = Math.floor(Math.random() * files.length);
                    const randomFile = files[randomIndex];
                    const [url] = await randomFile.getSignedUrl({
                        action: 'read',
                        expires: '03-01-2500',
                    });
                    return { folderName: folderPath, imageUrl: url };
                } else {
                    return { folderName: folderPath, imageUrl: '' };
                }
            })
        );
        randomImages.forEach(({ folderName, imageUrl }) => {
            const query = 'UPDATE OFFERS SET URL_IMAGE_OFFER = ? WHERE ID_OFFER = ?';
            queryDatabase(query, [imageUrl, folderName], (error) => {
                if (error) {
                    console.error('Error al actualizar la URL de imagen:', error);
                } else {
                    console.log('URL de imagen actualizada correctamente');
                }
            });
        });
        return randomImages;
    } catch (error) {
        console.error('Error al obtener las imágenes aleatorias de las publicaciones:', error);
        throw error;
    }
}

const fetchPublications = () => {
    return new Promise((resolve, reject) => {
        queryDatabase('SELECT * FROM OFFERS', (error, results, fields) => {
            if (error) {
                console.error('Error al obtener las publicaciones desde la base de datos:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

async function getImagesPost(req, res) {
    try {
        const folderPath = req.body.folderPath;
        const [files] = await bucket.getFiles({ prefix: folderPath });
        const urls = await Promise.all(
            files.map(async (file) => {
                const [url] = await file.getSignedUrl({
                    action: 'read',
                    expires: '03-01-2500',
                });
                return url;
            })
        );
        res.json({ image: urls });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Error fetching images' });
    }
}

module.exports = { fetchRandomImages, getImagesPost };