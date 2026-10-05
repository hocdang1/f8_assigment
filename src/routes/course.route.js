const { Router } = require('express');

const router = Router();

const courseController = require('../controllers/course.controller');

router.post('/', courseController.store);

router.get('/:slug', courseController.show);
router.get('/', courseController.index);

router.put('/:id(\\d+)', courseController.update);

router.patch('/:id(\\d+)/restore', courseController.restore);

router.delete('/:id(\\d+)/force', courseController.forceDestroy);
router.delete('/:id(\\d+)', courseController.destroy);

module.exports = router;
