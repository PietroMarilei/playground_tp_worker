// Nodemailer
const nodemailer = require("nodemailer");

module.exports = {
  sendEmail: async function (to, subject, html) {
    // Transporter (SMTP)
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_TRANSPORTER_HOST,
      port: Number(process.env.MAIL_TRANSPORTER_PORT),
      secure: String(process.env.MAIL_TRANSPORTER_SECURE) === "true", // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_TRANSPORTER_AUTH_USER,
        pass: process.env.MAIL_TRANSPORTER_AUTH_PASS
      }
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        throw new Error("Error connecting to mail server. " + error.message);
      } else {
        console.log("Server is ready to take our messages.");
      }
    });

    // Send mail
    let info = await transporter.sendMail({
      from: `"${process.env.MAIL_TRANSPORTER_FROM}" <${process.env.MAIL_TRANSPORTER_FROM_ADDRESS}>`,
      to: to,
      subject: subject,
      html: html
    });

    if (typeof info.err !== "undefined") {
      console.log("Message error: %s", info.err);
      throw new Error("Error sending email. " + info.err);
    }
  }
};
