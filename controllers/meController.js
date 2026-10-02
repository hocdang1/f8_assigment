'use strict';

const { Course } = require('../models');

class MeController {
    async storedCourses(req, res, next) {
        try {
            const courses = await Course.findAll({
                order: [['createdAt', 'DESC']],
                raw: true,
            });

            res.render('me/stored-courses', { courses });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MeController();
