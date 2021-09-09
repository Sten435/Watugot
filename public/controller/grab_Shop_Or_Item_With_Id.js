const db_config = require('../configurations/db_config.js');

function grab_Shop_Or_Item_With_Id(req, res, type) {
    
    if(req.params.id == 'undefined'){
        return res.status(400).json({ error: true, type: 'You have to pass an id.' })
    }

    let query_id;
    try {
        query_id = parseInt(req.params.id);
    } catch (error) {
        return res.status(400).json({ error: true, type: 'Item id is not a valid Number.' })
    }

    db_config.query({
        sql: `SELECT * FROM ${type} where id = ? LIMIT 1`,
    }, [query_id], function (error, results, fields) {
        if (error) throw error;

        if (results < 1) {
            results = {
                error: true,
                type: 'Item id is out of reach.'
            }
            res.status(400).json({ results })
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

module.exports = grab_Shop_Or_Item_With_Id