import { DataTypes, QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.addColumn('courses', 'video_id', {
            type: DataTypes.STRING,
        });
        await queryInterface.addColumn('courses', 'level', {
            type: DataTypes.STRING,
        });
    },
    async down(queryInterface: QueryInterface) {
        await queryInterface.removeColumn('courses', 'level');
        await queryInterface.removeColumn('courses', 'video_id');
    },
};
