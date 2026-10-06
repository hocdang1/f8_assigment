import { Router } from 'express';

import courseController from '../controllers/course.controller';

const router = Router();

router.post('/', courseController.store);

router.get('/:slug', courseController.show);
router.get('/', courseController.index);

router.put('/:id(\\d+)', courseController.update);

router.patch('/:id(\\d+)/restore', courseController.restore);

router.delete('/:id(\\d+)/force', courseController.forceDestroy);
router.delete('/:id(\\d+)', courseController.destroy);

export default router;
