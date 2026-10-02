const express = require('express');

const router = express.Router();

const courseController = require('../controllers/courseController');

router.get('/', courseController.index);
router.get('/create', courseController.create);
router.post('/store',courseController.store)
router.get('/:id/edit', courseController.edit);
router.get('/:id', courseController.destroy);
router.post('/:id', courseController.update);
router.get('/:id', courseController.show);
module.exports = router;
