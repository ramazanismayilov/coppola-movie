const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(__dirname, "../../.env");
dotenv.config({ path: envPath });

module.exports = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  smtp: {
    from: process.env.SMTP_FROM,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
  },
}; 
 