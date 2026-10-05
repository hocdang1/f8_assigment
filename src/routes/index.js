const { Router } = require('express');

const courseRoutes = require('./course.route');
const meRoutes = require('./me.route');

const router = Router();

router.use('/courses', courseRoutes);
router.use('/me', meRoutes);

module.exports = router;
