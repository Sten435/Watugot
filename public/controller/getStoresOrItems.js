const db_config = require('../configurations/db_config.js');

function get_Stores_Or_Items(res, type) {
    db_config.query({
        sql: `SELECT * FROM ${type} order by rand() LIMIT 16`
    }, function (error, results, fields) {
        if (error) throw error;
    
        if (results < 1) {
            results = {
                error: true
            }
            res.status(204).json(results)
        }
        else {
            results = {
                error: false,
                results
            }
            res.status(200).json(results)
        }
    })
}

module.exports = get_Stores_Or_Items