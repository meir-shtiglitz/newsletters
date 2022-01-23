const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL
    },
    tls: {
        rejectUnauthorized: false
      }
});

const sendMail = async(from, to, subject, text, atach) => {
     console.log(process.env.USER_MAIL);
     console.log(process.env.PASS_MAIL);
     console.log(atach);
    var info = await transporter.sendMail({
        from: `${from}<${process.env.USER_MAIL}>`,
        to: to,
        subject: subject,
        html: text,
        attachments:atach
    })
   
    if(atach) atach.forEach(file => fs.unlinkSync(file.path));
    return info;
}

module.exports.sendMail = sendMail;