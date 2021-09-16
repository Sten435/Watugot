const db_config = require('../configurations/db_config.js');

function featured(res, display_id) {
    db_config.query({
        sql: `UPDATE * FROM item WHERE authKey = ? order by rand() LIMIT 16`
    },[display_id], function (error, results, fields) {
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

module.exports = featured