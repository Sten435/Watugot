import escape from 'escape-html';
import sanitizeUserInput from './sanitizeUserInput.js';
import saveImage from './saveImage.js';
import query from '../configurations/db_config.js';

async function saveItem(req, res) {
    let { by_user, name, description, category, price, show_phone } = req.body;
    let unverified_userInputArray = Array(by_user, name, description, category, price, show_phone);
    let verified_userInputArray = Array();
    unverified_userInputArray.forEach(input => {
        if (typeof input == 'undefined' || typeof input == 'Nan') return
        if (input.trim() == "") return

        verified_userInputArray.push(input)
    });

    if (verified_userInputArray.length !== 6) {
        return res.status(400).json({ error: true, typeof: 'Some required values are not filled in.' })
    }

    [by_user, name, description, category, price, show_phone] = sanitizeUserInput(unverified_userInputArray, res)
    let image = await saveImage(req);

    price = parseFloat(price)
    if (typeof price !== 'number') {
        return res.status(422).json({ error: '\'price\' is not a valid number.' })
    }
    if (!image.error) {
        query({
            sql: "INSERT INTO `item`(`by_user`, `name`, `description`, `photo_id`, `category`, `price`, `show_phone`, `is_featured`, `featured_until`) VALUES (?,?,?,?,?,?,?,?,?);",
        }, [by_user, name, description, escape(image.URL), category, price, show_phone, null, null], function (error, results, fields) {
            if (error) throw error;

            if (results.affectedRows > 0) {
                return res.status(200).json({ success: true, url: image.URL, affectedRows: results.affectedRows });
            } else {
                return res.status(304).json({ error: true, typeof: 'No rows affected' });
            }
        })
    } else {
        return res.status(400).json({ error: true, error: image.typeof })
    }
}

export default saveItem