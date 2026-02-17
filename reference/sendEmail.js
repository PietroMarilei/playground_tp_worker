async function sendEmail(to, subject, html) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_TRANSPORTER_HOST,
    port: process.env.MAIL_TRANSPORTER_PORT,
    secure: process.env.MAIL_TRANSPORTER_SECURE, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_TRANSPORTER_AUTH_USER, // generated ethereal user
      pass: process.env.MAIL_TRANSPORTER_AUTH_PASS, // generated ethereal password
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages.");
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${process.env.MAIL_TRANSPORTER_FROM}" <${process.env.MAIL_TRANSPORTER_FROM_ADDRESS}>`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });

  if (typeof info.err !== "undefined") {
    console.log("Message error: %s", info.err);
  }
  console.log("Message sent: %s", info.messageId);
}