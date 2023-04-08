require("dotenv").config();

module.exports = {
  DB: process.env.DB,
  SECRET: process.env.APP_SECRET,
  EMAIL_SECRET: process.env.EMAIL_SECRET,
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASS: process.env.PASS,
  SERVICE: process.env.SERVICE,
  ACCOUNT_SID: process.env.ACCOUNT_SID,
  AUTH_TOKEN: process.env.AUTH_TOKEN,
  PHONE_NUMBER: process.env.PHONE_NUMBER,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOULD_API_SECRET: process.env.CLOULD_API_SECRET,
  PROXY: process.env.PROXY
};
