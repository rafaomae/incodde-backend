require("dotenv").config();

module.exports = {
  DB: process.env.APP_DB,
  PORT: process.env.APP_PORT,
  SECRET: process.env.APP_SECRET,
  EMAIL_USER: process.env.APP_EMAIL_USER,
  EMAIL_PASSWORD: process.env.APP_EMAIL_PASSWORD,
};
