require('dotenv').config();

module.exports = {
    HOST: process.env.HOST_DATABASE,
    USER: process.env.USER_DATABASE,
    PASSWORD: process.env.PASSWORD_DATABASE,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DIALECT: process.env.DIALECT
};