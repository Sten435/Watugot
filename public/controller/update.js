const db_config = require('../configurations/db_config.js');

/**
 * @param {'number'} id
 * @param {'string'} type
 * @param {'any'} value
 * @param {'res'} res
 * @param {'req'} req
 */
function update(id, type, value, res, req) {
    if (type == "") {
      return res.status(400).json({
        error: true, typeof: 'type can not be empty.'
      })
    }
  
    if (value == "") {
      return res.status(400).json({
        error: true, typeof: 'value can not be empty.'
      })
    }
  
    if (type == 'undefined') {
      return res.status(400).json({
        error: true, typeof: 'type can not be empty.'
      })
    }
  
    if (value == 'undefined') {
      return res.status(400).json({
        error: true, typeof: 'value can not be empty.'
      })
    }
  
    if (type == 'id') {
      if (typeof value !== Number) {
        return res.status(400).json({
          error: true, typeof: 'You can only update the type: \'id\' with a number'
        })
      }
    }
  
    let validTypes = ['id', 'name', 'description', 'category', 'photo_id', 'price', 'by_user', 'show_phone', 'is_featured', 'featured_until', 'posted_on'];
    let isValid = validTypes.includes(type);
  
    if (isValid) {
      if (typeof id !== 'undefined' && typeof type !== 'undefined' && typeof value !== 'undefined') {
        db_config.query({
          sql: `UPDATE item SET ${type}= ? WHERE id = ?`
        }, [value, id], function (error, results, fields) {
          if (error) throw error;
  
          if (results.affectedRows == 0) {
            return res.status(200).json({ error: false, typeof: 'No rows affected.' })
          }
  
          if (results < 1) {
            results = {
              error: true,
              typeof: 'No results'
            }
            res.status(204).json({ results })
          }
          else {
            res.status(200).json({ error: false, results })
          }
        })
      }
    }
    else {
      res.status(200).json({ error: true, typeof: 'Type is not valid.' })
    }
  }

  module.exports = update
