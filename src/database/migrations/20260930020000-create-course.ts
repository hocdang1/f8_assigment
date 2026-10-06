import { DataTypes, QueryInterface } from 'sequelize';

export default {
    async up(queryInterface: QueryInterface) {
        await queryInterface.createTable('courses', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING },
            image: { type: DataTypes.STRING },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    async down(queryInterface: QueryInterface) {
        await queryInterface.dropTable('courses');
    },
};
