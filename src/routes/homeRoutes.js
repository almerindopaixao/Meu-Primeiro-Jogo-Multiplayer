import { Router } from 'express';

import homeController from '../controllers/homeController';

const router = new Router();

router.get('/', homeController.index);
router.post('/', homeController.store);

export default router;