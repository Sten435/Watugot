const express = require('express')
const router = express.Router();

const get_route = require('./get/get-route.js')
const post_route = require('./post/post-route.js')
const put_route = require('./put/put-routes.js')

router.use(get_route)
router.use(post_route)
router.use(put_route)

module.exports = router