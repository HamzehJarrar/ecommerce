import { Router } from 'express';
import * as cartController from '../controllers/cartController.js';

const router = Router();

router.get('/:sessionId', cartController.get);
router.post('/:sessionId/items', cartController.addItem);
router.put('/:sessionId/items/:productId', cartController.updateItem);
router.delete('/:sessionId/items/:productId', cartController.removeItem);
router.delete('/:sessionId', cartController.clear);

export default router;
