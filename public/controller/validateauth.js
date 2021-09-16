const db_config = require('../configurations/db_config.js');

function validateauth(display_id) {
    db_config.query({
        sql: `SELECT * FROM users WHERE authKey = ? LIMIT 1`
    },[db_config.escape(display_id)], function (error, results, fields) {
        if (error) throw error;
    
        if (results < 1) {
            return false
        }
        else {
            return true
        }
    })
}

module.exports = validateauth