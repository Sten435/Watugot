const db_config = require('../configurations/db_config.js');

function getCatagory(res) {
    db_config.query({
        sql: "SELECT category FROM item group by category" // remove group by category if you dont want to filter the duplicates
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

module.exports = getCatagory