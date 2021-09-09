const db_config = require('../configurations/db_config.js');

function getRecent(res) {
    db_config.query({
        sql: "SELECT * FROM item order by posted_on DESC LIMIT 16"
    }, function (error, results, fields) {
        if (error) throw error;

        if (results < 1) {
            results = {
                error: true,
            }
            res.status(204).json({ results })
        }
        else {
            results = {
                error: false,
                results
            }
            res.status(200).json({ results })
        }
    })
}

module.exports = getRecent