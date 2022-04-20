import query from '../configurations/db_config.js';
import escape from 'escape-html';

function validateauth(display_id) {
    query({
        sql: `SELECT * FROM users WHERE authKey = ? LIMIT 1`
    },[escape(display_id)], function (error, results, fields) {
        if (error) throw error;
    
        if (results < 1) {
            return false
        }
        else {
            return true
        }
    })
}

export default validateauth