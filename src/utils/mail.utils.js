const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.password,
  },
});

const sendMail = (from, to, subject, content) => {
  try {
    let result = transporter.sendMail({
      from,
      to,
      subject,
      html: content,
    });
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = sendMail;
