const express = require('express')
const router = express.Router();

const update = require('../../controller/update.js')

router.put('/api/update/item/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let type = escape(req.body.type);
    let value = escape(req.body.value);

    update(id, type, value, res, req)
})

module.exports = router