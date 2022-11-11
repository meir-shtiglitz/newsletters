const express = require('express')
const router = express.Router();
const { sendMail } = require('../model/emails');

router.post("/contact/sendmail", async(req, res) => {
    console.log("req.body from route contact",req.body);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authortization');
    res.setHeader('Acces-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    const {from, msg} = req.body;
    const result = await sendMail("contact msg", process.env.ADMIN_MAIL,`from ${from}`, `<p>the msg: ${msg} </p>`);
    console.log(result)
    res.send(result);
})

module.exports = router;