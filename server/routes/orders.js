import { Router } from 'express';
import * as orderController from '../controllers/orderController.js';

const router = Router();

router.post('/', orderController.create);
router.get('/user/:userId', orderController.listByUser);
router.get('/:orderId', orderController.getById);
router.patch('/:orderId/status', orderController.patchStatus);

export default router;
