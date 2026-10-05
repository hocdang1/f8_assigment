const express = require('express');

const router = express.Router();

router.use('/courses', require('./course.routes'));
router.use('/me', require('./me.routes'));

module.exports = router;
