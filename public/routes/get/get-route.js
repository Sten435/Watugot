const express = require('express')
const router = express.Router()

const search = require('../../controller/search.js')
const grab_Shop_Or_Item_With_Id = require('../../controller/grabShopOrItemWithId.js')
const getCatagory = require('../../controller/getCatagory.js')
const getFeatured = require('../../controller/getFeatured.js')
const get_Stores_Or_Items = require('../../controller/getStoresOrItems.js')
const getRecent = require('../../controller/getRecent.js')
const featured = require('../../controller/featured.js')
const validateauth = require('../../controller/validateAuth.js')

router.get('/api/items', (req, res) => {
    get_Stores_Or_Items(res, 'item')
})

router.get('/api/store', (req, res) => {
    get_Stores_Or_Items(res, 'shop');
})

router.get('/api/item/recent', (req, res) => {
    getRecent(res)
})

router.get('/api/item/featured', (req, res) => {
    getFeatured(res, 'item');
})

router.get('/api/store/featured', (req, res) => {
    getFeatured(res, 'shop');
})

router.get('/api/category', (req, res) => {
    getCatagory(res);
})

router.get('/api/item/:id', (req, res) => {
    grab_Shop_Or_Item_With_Id(req, res, 'item');
})

router.get('/api/store/:id', (req, res) => {
    grab_Shop_Or_Item_With_Id(req, res, 'shop');
})

router.get('/api/search/:table/:value', (req, res) => {
    search(res, req);
})

router.get('/api/featured/:authkey/:display_id', (req, res) => {
    let [authKey, display_id] = req.query;
    if (validateauth(authkey)) {
        featured(res, display_id)
    }
    else{
        res.sendStatus(400).json({ error: true, typeof: 'Invalid Auth Validation' })
    }
})

module.exports = router