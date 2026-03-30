import { Router } from 'express';
import * as productController from '../controllers/productController.js';

const router = Router();

router.get('/', productController.list);
router.get('/featured/list', productController.featured);
router.get('/deals/today', productController.dealsToday);
router.get('/:id', productController.getById);

export default router;
