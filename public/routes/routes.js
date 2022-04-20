import { Router } from 'express';
const router = Router();

import get_route from './get/get-route.js';
import post_route from './post/post-route.js';
import put_route from './put/put-routes.js';

router.use(get_route)
router.use(post_route)
router.use(put_route)

export default router