const { queryDatabase } = require('./databaseService.js');

function getPublications(req, res) {
    const query = 'SELECT * FROM publications';
    queryDatabase(query, (error, results) => {
        if (error) {
            console.error('Error al obtener las publicaciones:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results); // Envía las publicaciones como respuesta
    });
}

function getPublication(req, res) {
    const id = req.params.id; // Obtener el ID de la URL
    // Consulta SQL para buscar la publicación por su ID en la tabla PUBLICATIONS
    const query = `SELECT * FROM PUBLICATIONS WHERE ID_PUBLICATION = ${id}`;

    // Ejecutar la consulta
    queryDatabase(query, (error, results) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ error: 'Error al buscar la publicación' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Publicación no encontrada' });
            return;
        }

        const publication = results[0];
        res.json(publication); // Enviar los detalles de la publicación como respuesta en formato JSON
    });
}

module.exports = { getPublication, getPublications };