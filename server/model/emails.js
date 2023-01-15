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