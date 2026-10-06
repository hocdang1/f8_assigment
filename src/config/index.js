require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
    db: {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
};

module.exports = config;
