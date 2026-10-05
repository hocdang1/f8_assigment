'use strict';

const { Op } = require('sequelize');
const { Course } = require('../../models');

class MeController {
    // GET /api/v1/me/stored/courses
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

            res.status(200).json({ success: true, data: courses, deletedCount });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/v1/me/trash/courses
    async trashCourses(req, res, next) {
        try {
            const courses = await Course.findAll({
                where: { deletedAt: { [Op.ne]: null } },
                paranoid: false,
                order: Course.sortable(res.locals._sort, [['deletedAt', 'DESC']]),
                raw: true,
            });

            res.status(200).json({ success: true, data: courses });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MeController();
