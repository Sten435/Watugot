import query from '../configurations/db_config.js';

const getCatagory = (res) => {
    query({
        sql: "SELECT DISTINCTED category FROM item;"
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

export default getCatagory