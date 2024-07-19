const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'fotosparepartbat@gmail.com',
    pass: 'zljx wyob ndxi bqby'
  },
});

const sendEmail = async (toEmail, subject = 'Welcome to HacktivBit!', htmlContent = 
      `<p>Thank you for signing up with HacktivBit. Unlock your future with us!</p>`
    ) => {
  try {

    let mailOptions = {
      from: 'fotosparepartbat@gmail.com',
      to: toEmail,
      subject: subject,
      html: htmlContent
    };

    let info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };