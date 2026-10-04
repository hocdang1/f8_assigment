'use strict';

const { Op } = require('sequelize');
const { Course } = require('../models');

class MeController {
    async storedCourses(req, res, next) {
        try {
            const courses = await Course.findAll({
                order: Course.sortable(res.locals._sort),
                raw: true,
            });

            const deletedCount = await Course.count({
                where: { deletedAt: { [Op.ne]: null } },
                paranoid: false,
            });

            res.render('me/stored-courses', { courses, deletedCount });
        } catch (error) {
            next(error);
        }
    }

    async trashCourses(req, res, next) {
        try {
            const courses = await Course.findAll({
                where: { deletedAt: { [Op.ne]: null } },
                paranoid: false,
                order: Course.sortable(res.locals._sort, [['deletedAt', 'DESC']]),
                raw: true,
            });

            res.render('me/trash-courses', { courses });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MeController();
