import { Router } from 'express'
const router = Router()

import search from '../../controller/search.js'
import grabShopOrItemWithId from '../../controller/grabShopOrItemWithId.js'
import getCatagory from '../../controller/getCatagory.js'
import getFeatured from '../../controller/getFeatured.js'
import getStoresOrItems from '../../controller/getStoresOrItems.js'
import getRecent from '../../controller/getRecent.js'
import featured from '../../controller/featured.js'
import validateauth from '../../controller/validateAuth.js'

router.get('/api/items', (req, res) => getStoresOrItems(res, 'item'))

router.get('/api/store', (req, res) => getStoresOrItems(res, 'shop'))

router.get('/api/item/recent', (req, res) => getRecent(res))

router.get('/api/item/featured', (req, res) => getFeatured(res, 'item'))

router.get('/api/store/featured', (req, res) => getFeatured(res, 'shop'))

router.get('/api/category', (req, res) => getCatagory(res))

router.get('/api/item/:id', (req, res) => grabShopOrItemWithId(req, res, 'item'))

router.get('/api/store/:id', (req, res) => grabShopOrItemWithId(req, res, 'shop'))

router.get('/api/search/:table/:value', (req, res) => search(res, req))

router.get('/api/featured/:authkey/:display_id', (req, res) => {
    let [authKey, display_id] = req.query;
    if (validateauth(authKey)) featured(res, display_id)
    else res.sendStatus(400).json({ error: true, typeof: 'Invalid Auth Validation' })
})

export default router