import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = Router();

router.post("/add", categoryController.addCategory);
router.get('/', categoryController.list);
router.get('/:slug', categoryController.getBySlug);

export default router;
