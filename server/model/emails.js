// const nodemailer = require('nodemailer');
// const fs = require('fs');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     auth: {
//         user: process.env.USER_MAIL,
//         pass: process.env.PASS_MAIL
//     },
//     tls: {
//         rejectUnauthorized: false
//       }
// });

// const sendMail = async(from, to, subject, text, atach) => {
//      console.log(process.env.USER_MAIL);
//      console.log(process.env.PASS_MAIL);
//      console.log(atach);
//     var info = await transporter.sendMail({
//         from: `${from}<${process.env.USER_MAIL}>`,
//         to: to,
//         subject: subject,
//         html: text,
//         attachments:atach
//     })
   
//     if(atach) atach.forEach(file => fs.unlinkSync(file.path));
//     return info;
// }

const sgMail = require('@sendgrid/mail')

const sendMail = async (from, to, subject, text, atach) => {
    console.log('from, to, subject, text', from, to, subject, text)
  console.log('from email sendhng')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: to,
    from: `${from} <${process.env.USER_MAIL}>`,
    subject: subject,
    html: text,
    attachments:atach
  }
  console.log('msg', msg)
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error('errr',error)
    })
}

module.exports.sendMail = sendMail;