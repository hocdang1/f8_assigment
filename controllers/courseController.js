'use strict';

const createError = require('http-errors');
const { Op } = require('sequelize');
const { Course } = require('../models');

class CourseController {
    async index(req, res, next) {
        try {
            const courses = await Course.findAll({ raw: true });

            res.render('course/course', {
                courses,
            });
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const course = await Course.findOne({ where: { slug: req.params.slug }, raw: true });

            if (!course) {
                return next(createError(404, 'Không tìm thấy khóa học'));
            }

            res.render('course/show', { course });
        } catch (error) {
            next(error);
        }
    }

    create(req, res) {
        res.render('course/create');
    }

    async store(req, res, next) {
        try {
            const { name, description, videoId, level } = req.body;

            await Course.create({
                name,
                description,
                videoId,
                level,
                image: `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/sddefault.jpg`,
            });

            res.redirect('/course');
        } catch (error) {
            next(error);
        }
    }
    async edit(req, res, next) {
       try {
            const course = await Course.findByPk(req.params.id, { raw: true });

            if (!course) {
                return next(createError(404, 'Không tìm thấy khóa học'));
            }

            res.render('course/edit', { course });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const course = await Course.findByPk(req.params.id);

            if (!course) {
                return next(createError(404, 'Không tìm thấy khóa học'));
            }

            const { name, description, videoId, level } = req.body;

            await course.update({
                name,
                description,
                videoId,
                level,
                image: `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/sddefault.jpg`,
            });

            res.redirect('/me/stored/courses');
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const course = await Course.findByPk(req.params.id);

            if (!course) {
                return next(createError(404, 'Không tìm thấy khóa học'));
            }

            await course.destroy();

            res.redirect('/me/stored/courses');
        } catch (error) {
            next(error);
        }
    }

    async restore(req, res, next) {
        try {
            const course = await Course.findByPk(req.params.id, { paranoid: false });

            if (!course) {
                return next(createError(404, 'Không tìm thấy khóa học'));
            }

            await course.restore();

            res.redirect('/me/trash/courses');
        } catch (error) {
            next(error);
        }
    }


    async forceDestroy(req, res, next) {
        try {
            const course = await Course.findByPk(req.params.id, { paranoid: false });

            if (!course) {
                return next(createError(404, 'Không tìm thấy khóa học'));
            }

            await course.destroy({ force: true });

            res.redirect('/me/trash/courses');
        } catch (error) {
            next(error);
        }
    }


    async handleFormActions(req, res, next) {
        try {

            const courseIds = [].concat(req.body.courseIds || []);

            if (courseIds.length === 0) {
                return next(createError(400, 'Chưa chọn khóa học nào'));
            }

            switch (req.body.action) {
                case 'delete':
                    await Course.destroy({ where: { id: { [Op.in]: courseIds } } });
                    return res.redirect('/me/stored/courses');

                case 'restore':
                    await Course.restore({ where: { id: { [Op.in]: courseIds } } });
                    return res.redirect('/me/trash/courses');

                case 'forceDelete':
               
                    await Course.destroy({
                        where: { id: { [Op.in]: courseIds }, deletedAt: { [Op.ne]: null } },
                        force: true,
                    });
                    return res.redirect('/me/trash/courses');

                default:
                    return next(createError(400, 'Hành động không hợp lệ'));
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CourseController();
