'use strict';

module.exports = {
    async up(queryInterface) {
        const now = new Date();

        await queryInterface.bulkInsert('courses', [
            { name: 'Nguyen Van A', description: 'anh day dep trai', created_at: now, updated_at: now },
            { name: 'Tran Thi B', description: 'anh day gia truong', created_at: now, updated_at: now },
            { name: 'Le Van C', description: 'anh day chiu kho', created_at: now, updated_at: now },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete('courses', null, {});
    },
};
