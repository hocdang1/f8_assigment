import { Sequelize } from 'sequelize';

import config from '../config';
import { initCourse } from './course';

export const sequelize = new Sequelize({
    ...config.db,
    logging: config.environment === 'development' ? console.log : false,
    define: {
        underscored: true,
        freezeTableName: true,
    },
});


export const Course = initCourse(sequelize);


