import query from '../configurations/db_config.js';
import escape from 'escape-html';

function search(res, req) {
  let table = escape(req.params.table)
  let value = escape(req.params.value)

  if (table !== 'undefined' && value !== 'undefined') {
    if (table === 'item' || table === 'shop') {
      let sql, add_is_featured = ""

      if (typeof value == Boolean || value == 1 || value == 0) {
        add_is_featured = `OR is_featured = ${escape(value)}`
      }

      if (table === 'item') {
        sql = `SELECT * FROM item WHERE name = ${escape(value)} OR description = ${escape(value)} OR category = ${escape(value)} OR photo_id = ${escape(value)} OR price = ${escape(value)} OR by_user = ${escape(value)} OR featured_until = ${escape(value)} OR posted_on = ${escape(value)} OR show_phone = ${escape(value)} ${add_is_featured} ORDER BY Rand();`
      } else {
        sql = `SELECT * FROM shop WHERE name = ${escape(value)} OR description = ${escape(value)} OR adress = ${escape(value)} OR created_date = ${escape(value)} ${add_is_featured} ORDER BY Rand()`
      }

      query({ sql }, function (error, results, fields) {
        if (error) throw error;

        if (results < 1) {
          results = {
            error: true,
            typeof: 'No content was taken from database.'
          }
          res.status(206).json(results)
        }
        else {
          results = {
            error: false,
            sql: results
          }
          res.status(200).json(results)
        }
      })

    } else {
      return res.status(400).json({ error: true, typeof: 'The passed table is incorrect.' })
    }
  }
  else return res.status(400).json({ error: true, typeof: 'Some required values are not filled in.' })
}

export default search