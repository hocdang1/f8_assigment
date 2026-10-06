'use strict';

const createError = require('http-errors');
const { Course } = require('../models');

const youtubeImage = (videoId) => `https://img.youtube.com/vi/${encodeURIComponent(videoId)}/sddefault.jpg`;

class CourseController {
    // GET /api/v1/courses
    async index(req, res, next) {
        try {
            const courses = await Course.findAll({ raw: true });

            res.status(200).json({ success: true, data: courses });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/v1/courses/:slug
    async show(req, res, next) {
        try {
            const course = await Course.findOne({ where: { slug: req.params.slug }, raw: true });

            if (!course) {
                return next(createError(404, 'Không tìm thấy khóa học'));
            }

            res.status(200).json({ success: true, data: course });
        } catch (error) {
            next(error);
        }
    }

    // POST /api/v1/courses
    async store(req, res, next) {
        try {
            const { name, description, videoId, level } = req.body;

            const course = await Course.create({
                name,
                description,
                videoId,
                level,
                image: youtubeImage(videoId),
            });

            res.status(201).json({ success: true, message: 'Tạo khóa học thành công', data: course });
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/v1/courses/:id
    async update(req, res, next) {
        try {
            const course = await Course.findByPk(req.params.id);

            if (!course) {
                return next(createError(404, 'Không tìm thấy khóa học'));
            }

            const { name, description, videoId, level } = req.body;

            // set + save (không dùng update): update chỉ lưu các field truyền vào
            // nên slug mới do hook beforeUpdate tạo ra sẽ bị bỏ qua
            course.set({
                name,
                description,
                videoId,
                level,
                ...(videoId && { image: youtubeImage(videoId) }),
            });
            await course.save();

            res.status(200).json({ success: true, message: 'Cập nhật khóa học thành công', data: course });
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/v1/courses/:id (xóa mềm)
    async destroy(req, res, next) {
        try {
            const course = await Course.findByPk(req.params.id);

            if (!course) {
                return next(createError(404, 'Không tìm thấy khóa học'));
            }

            await course.destroy();

            res.status(200).json({ success: true, message: 'Đã chuyển khóa học vào thùng rác' });
        } catch (error) {
            next(error);
        }
    }

    // PATCH /api/v1/courses/:id/restore
    async restore(req, res, next) {
        try {
            const course = await Course.findByPk(req.params.id, { paranoid: false });

            if (!course) {
                return next(createError(404, 'Không tìm thấy khóa học'));
            }

            await course.restore();

            res.status(200).json({ success: true, message: 'Khôi phục khóa học thành công', data: course });
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/v1/courses/:id/force (xóa vĩnh viễn)
    async forceDestroy(req, res, next) {
        try {
            const course = await Course.findByPk(req.params.id, { paranoid: false });

            // chỉ xóa vĩnh viễn khóa học đã nằm trong thùng rác
            if (!course || !course.deletedAt) {
                return next(createError(404, 'Không tìm thấy khóa học'));
            }

            await course.destroy({ force: true });

            res.status(200).json({ success: true, message: 'Đã xóa vĩnh viễn khóa học' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CourseController();
