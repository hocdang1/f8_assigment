const express = require('express');

const router = express.Router();

const courseController = require('../../controllers/api-v1/courseController');

router.get('/', courseController.index);
router.post('/', courseController.store);

router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/force', courseController.forceDestroy);
router.delete('/:id', courseController.destroy);
router.get('/:slug', courseController.show);

module.exports = router;
