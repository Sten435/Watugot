import { Router } from 'express';
import escape from 'escape-html';
const router = Router();

import update from '../../controller/update.js';

router.put('/api/update/item/:id', (req, res) => {
    const id = req.params.id;
    const type = escape(req.body.type);
    const value = escape(req.body.value);

    update(id, type, value, res, req)
})

export default router