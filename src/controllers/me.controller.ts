import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';

import { Course } from '../models';

class MeController {
    // GET /api/v1/me/stored/courses
    async storedCourses(_req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await Course.findAll({
                order: [['createdAt', 'DESC']],
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
    async trashCourses(_req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await Course.findAll({
                where: { deletedAt: { [Op.ne]: null } },
                paranoid: false,
                order: [['deletedAt', 'DESC']],
                raw: true,
            });

            res.status(200).json({ success: true, data: courses });
        } catch (error) {
            next(error);
        }
    }
}

export default new MeController();
