import { DataTypes, QueryInterface, QueryTypes } from 'sequelize';
import slugify from 'slugify';

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.addColumn('courses', 'slug', {
            type: DataTypes.STRING,
        });
        await queryInterface.addColumn('courses', 'deleted_at', {
            type: DataTypes.DATE,
        });

        // Tạo slug cho các khóa học đã có
        const courses = await queryInterface.sequelize.query<{
            id: number;
            name: string;
        }>('SELECT id, name FROM courses ORDER BY id', {
            type: QueryTypes.SELECT,
        });
        const used = new Set<string>();
        for (const course of courses) {
            const base =
                slugify(course.name, {
                    lower: true,
                    strict: true,
                    locale: 'vi',
                }) || 'khoa-hoc';
            let slug = base;
            let i = 1;
            while (used.has(slug)) slug = `${base}-${i++}`;
            used.add(slug);
            await queryInterface.bulkUpdate(
                'courses',
                { slug },
                { id: course.id },
            );
        }

        await queryInterface.changeColumn('courses', 'slug', {
            type: DataTypes.STRING,
            allowNull: false,
        });
        await queryInterface.addIndex('courses', ['slug'], {
            unique: true,
            name: 'courses_slug_unique',
        });
    },
    async down(queryInterface: QueryInterface) {
        await queryInterface.removeIndex('courses', 'courses_slug_unique');
        await queryInterface.removeColumn('courses', 'deleted_at');
        await queryInterface.removeColumn('courses', 'slug');
    },
};
