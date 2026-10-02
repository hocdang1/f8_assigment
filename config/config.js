require('dotenv').config();

const base = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  dialect:  'mysql',
  define: {
    underscored: true,
    freezeTableName: true,
  },
};

module.exports = {
  development: { ...base, database: process.env.DB_NAME, logging: console.log },
  test:        { ...base, database: `${process.env.DB_NAME}_test`, logging: false },
  production:  { ...base, database: process.env.DB_NAME, logging: false },
};
