const express = require('express')
const router = express.Router();
const { sendMail } = require('../model/emails');

router.post("/contact/sendmail", async(req, res) => {
    console.log("req.body from route contact",req.body);
    const {from, msg} = req.body;
    const result = await sendMail("contact msg", process.env.ADMIN_MAIL,`from ${from}`, `the msg: ${msg}`);
    console.log(result)
    res.send(result);
})

module.exports = router;