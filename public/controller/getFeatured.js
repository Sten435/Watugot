import query from '../configurations/db_config.js';

function getFeatured(res, type) {
    query({
        sql: `SELECT * FROM ${type} WHERE is_featured = 1 order by rand() LIMIT 16`
    }, function (error, results, fields) {
        if (error) throw error;

        if (results < 1) {
            results = {
                error: true
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

export default getFeatured