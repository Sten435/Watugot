import { Router } from 'express';
const router = Router();

import saveItem from '../../controller/saveItem.js';
import signup from '../../controller/signup.js';

router.post('/api/signup', (req, res) => {
    signup(req, res)
})

router.post('/api/item', async (req, res) => {
    await saveItem(req, res);
})

export default router