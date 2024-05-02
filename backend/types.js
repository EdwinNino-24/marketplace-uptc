const { queryDatabase } = require('./databaseService.js');

async function getTypePosts(req, res) {
    await queryDatabase('SELECT * FROM TYPES_OFFERS', (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al consultar la base de datos" });
        }
        res.json(results);
    });
}

async function getLocations(req, res) {
    await queryDatabase('SELECT * FROM LOCATIONS', (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al consultar la base de datos" });
        }
        res.json(results);
    });
}

async function getCategories(req, res) {
    await queryDatabase('SELECT * FROM CATEGORIES', (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al consultar la base de datos" });
        }
        res.json(results);
    });
}

async function getStates(req, res) {
    await queryDatabase('SELECT * FROM STATES', (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al consultar la base de datos" });
        }
        res.json(results);
    });
}

module.exports = { getTypePosts, getCategories, getLocations, getStates };