'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {}

    Course.init(
        {
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING },
            image: { type: DataTypes.STRING },
            videoId: { type: DataTypes.STRING },
            level: { type: DataTypes.STRING },
        },
        {
            sequelize,
            modelName: 'Course',
            tableName: 'courses',
            underscored: true,
        },
    );

    return Course;
};
