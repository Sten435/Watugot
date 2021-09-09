const express = require('express')
const router = express.Router();

const saveItem = require('../../controller/saveItem.js')
const signup = require('../../controller/signup.js')

router.post('/api/signup', (req, res) => {
    signup(req, res)
})

router.post('/api/item', async (req, res) => {
    await saveItem(req, res);
})

module.exports = router