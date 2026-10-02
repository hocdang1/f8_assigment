'use strict';

const createError = require('http-errors');
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
            const course = await Course.findByPk(req.params.id, { raw: true });

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
    
    
}

module.exports = new CourseController();
