'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('courses', 'video_id', {
            type: Sequelize.STRING,
        });
        await queryInterface.addColumn('courses', 'level', {
            type: Sequelize.STRING,
        });
    },
    async down(queryInterface) {
        await queryInterface.removeColumn('courses', 'level');
        await queryInterface.removeColumn('courses', 'video_id');
    },
};
