'use strict';
const { Model, Op } = require('sequelize');
const slugify = require('slugify');

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        // Trả về mảng order cho findAll dựa vào res.locals._sort
        // Dùng: Course.findAll({ order: Course.sortable(res.locals._sort) })
        static sortable(sort, defaultOrder = [['createdAt', 'DESC']]) {
            // chỉ cho sắp xếp theo cột có thật trong model (không tin người dùng)
            const columns = Object.keys(this.getAttributes());

            if (sort.enabled && columns.includes(sort.column)) {
                const type = sort.type === 'asc' ? 'ASC' : 'DESC';
                return [[sort.column, type]];
            }

            return defaultOrder;
        }
    }

    Course.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notEmpty: true },
            },
            description: { type: DataTypes.STRING },
            image: { type: DataTypes.STRING },
            videoId: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { notEmpty: true },
            },
            level: { type: DataTypes.STRING },
            slug: { type: DataTypes.STRING, allowNull: false, unique: true },
        },
        {
            sequelize,
            modelName: 'Course',
            tableName: 'courses',
            underscored: true,
            paranoid: true, // xóa mềm: destroy() chỉ ghi deleted_at
            hooks: {
                // Tạo slug từ name, thêm -1, -2... nếu trùng
                async beforeValidate(course) {
                    if (!course.name || (course.slug && !course.changed('name'))) return;

                    const base = slugify(course.name, { lower: true, strict: true, locale: 'vi' }) || 'khoa-hoc';
                    let slug = base;
                    let i = 1;
                    while (
                        await Course.findOne({
                            where: { slug, ...(course.id && { id: { [Op.ne]: course.id } }) },
                            paranoid: false, // bản ghi đã xóa mềm vẫn giữ slug
                        })
                    ) {
                        slug = `${base}-${i++}`;
                    }
                    course.slug = slug;
                },
            },
        },
    );

    return Course;
};
