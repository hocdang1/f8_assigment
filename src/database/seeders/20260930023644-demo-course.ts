import { QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        const now = new Date();

        await queryInterface.bulkInsert('courses', [
            { name: 'Nguyen Van A', slug: 'nguyen-van-a', description: 'anh day dep trai', created_at: now, updated_at: now },
            { name: 'Tran Thi B', slug: 'tran-thi-b', description: 'anh day gia truong', created_at: now, updated_at: now },
            { name: 'Le Van C', slug: 'le-van-c', description: 'anh day chiu kho', created_at: now, updated_at: now },
        ]);
    },
    async down(queryInterface: QueryInterface) {
        await queryInterface.bulkDelete('courses', {}, {});
    },
};
