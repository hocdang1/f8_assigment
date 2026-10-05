const { Router } = require('express');

const meController = require('../controllers/me.controller');

const router = Router();

router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);

module.exports = router;
