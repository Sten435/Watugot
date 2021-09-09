const db_config = require('../configurations/db_config.js');
const verify_wallet = require('../controller/verify_wallet.js');
const escape = require('escape-html');
const saveImage = require('./saveImage.js');

async function signup(req, res) {
    let { name = 'not set', second_name = 'not set', phone = 'not set', adress = 'not set', bought_items = 'not set', sold_items = 'not set', pi_adress = 'not set' } = req.body
    let Userinput_array = Array(name, second_name, pi_adress, phone, adress, bought_items, sold_items)
    let empty_array = Array()

    Userinput_array.forEach(item => {
        if (item !== 'not set') return
        empty_array.push(item)
    })

    if (empty_array.length > 0) return res.status(400).json({
        error: true,
        typeof: 'Not all required items are filled in.'
    })

    name = escape(name)
    second_name = escape(second_name)
    phone = escape(phone)
    adress = escape(adress)
    bought_items = escape(bought_items)
    sold_items = escape(sold_items)
    pi_adress = escape(pi_adress)

    let regx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    if (!regx.test(phone)) return res.status(400).json({ error: true, error: 'Invalid phone number.' })

    if (verify_wallet(pi_adress)) {
        let image = await saveImage(req, true)

        if (!image.error) {
            image = escape(image.URL)
            Userinput_array = [name, second_name, pi_adress, image, phone, adress, bought_items, sold_items]
            db_config.query({
                sql: "INSERT INTO `users`(`name`, `second_name`, `pi_pub_addres`, `profile_photo_id`, `phone`, `address`, `bought_items`, `sold_items`) VALUES (?,?,?,?,?,?,?,?);"
            }, Userinput_array, function (error, results, fields) {
                if (error) throw error;

                if (results < 1) {
                    results = {
                        error: true,
                    }
                    res.status(204).json({ results })
                }
                else {
                    if (results.affectedRows > 0) {
                        res.status(200).json({ error: false, succes: true, userDatabaseId: results.insertId })

                    } else {
                        results = {
                            error: true,
                            typeof: 'No rows where affected.'
                        }
                        res.status(400).json({ results })
                    }
                }
            })
        } else {
            return res.status(400).json({ error: true, error: image.typeof })
        }
    } else {
        return res.status(400).json({ error: true, error: 'Not a valid pi address.' })
    }
}

module.exports = signup