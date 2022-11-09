const express = require('express')
const router = express.Router();
const {isLoged, isAdmin} = require('../middlewears/user');
const { sendMail } = require('../model/emails');
const Nletter = require("../model/nletter");
const nletter = require('../model/nletter');
const { emailValid } = require('../validation/nletter');
const multer  = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });

// get all newsletters / or all from one user
router.get('/nletters/all/:userID', async (req, res) => {
    try {
        const {userID} = req.params;
        console.log(userID);
        const findWhat = userID !== "all" ? {parent:userID} : {};
        // console.log("findWhat",findWhat);
        const nletters = await Nletter.find(findWhat).exec();
        // console.log("nletters from routs: ",nletters);
        const nlSorts = nletters.sort((a,b)=> b.emails.length - a.emails.length )
        res.status(200).json(nlSorts)
    } catch (error) {
        console.log(error);
        res.status(400).send("get newsletters failed")
    }
})

// get a newsletter
router.get('/nletter/get/:nLId', async (req, res) => {
    console.log("req.params", req.params);
    try {
        const {nLId } = req.params;
        const nletter = await Nletter.findById(nLId).exec();
        // console.log("nletter from routs: ",nletter);
        res.status(200).json(nletter)
    } catch (error) {
        console.log(error);
        res.status(400).send("get the newsletter failed")
    }
})

// adding a newsletter
router.post('/nletter/add', isLoged, async (req, res) => {
    console.log("req.body", req.body);
    console.log("req.token", req.tokenId);
    try {
        const { name, title, description, invitation, classStyle, logo } = req.body;
        const nletter = await new Nletter({name, title, description, invitation, classStyle, logo, parent:req.tokenId, emails:[req.user.email] }).save();
        // console.log("nletter",nletter);
        res.json(nletter)
    } catch (error) {
        console.log(error);
        res.status(400).send("Create newsletter failed")
    }
})
// router.post('/nletter/add', isLoged, async (req, res) => {
//     console.log("req.body", req.body);
//     console.log("req.token", req.tokenId);
//     try {
//         const { name, title, description, invitation, logo } = req.body;
//         const nletter = await new Nletter({name, title, description, invitation, logo, parent:req.tokenId }).save();
//         console.log("nletter",nletter);
//         res.json(nletter)
//     } catch (error) {
//         console.log(error);
//         res.status(400).send("Create newsletter failed")
//     }
// })

// delete a newsletter
router.delete('/nletter/delete',isLoged, isAdmin, async (req, res) => {
    console.log("req.query", req.query);
    console.log("req.body", req.body);
    console.log("req.tokenId", req.tokenId);
    console.log("req.autor...", req.headers.authorization);
    try {
        const { _id } = req.body;
        await Nletter.findByIdAndDelete(_id).exec();
        // console.log(nletter);
        res.json("newsletter deleted succesfuly")
    } catch (error) {
        res.status(400).send("newsletter deleted failed")
    }
})

// update a newsletter
router.put('/nletter/update', isLoged, isAdmin, async (req, res) => {
    console.log("req.body from routes", req.body);
    console.log("req.tokenId", req.tokenId);
    try {
        Nletter.findByIdAndUpdate({_id: req.body._id},{...req.body},{new:true}, (err, nletter) => {
            if(err) return res.status(400).json("something error happened");
            // console.log('nletter updated',nletter);
            res.status(200).json(nletter)
        })
    } catch (error) {
        res.status(400).send("newsletter updated failed")
    }
})

// addinig an email to a newsletter
router.post('/nletter/mails/add', async (req, res) => {
    console.log("req.body",req.body);
    try { 
        const {listId, email} = req.body;
        const {error} = emailValid({email});
        if(error) return res.status(400).json({error:error});
        Nletter.findById(listId, (err, nletter) => {
            // console.log(nletter);
            // console.log(err);
            if(!nletter.emails.includes(email)){
                nletter.emails.push(email);
                nletter.save();
                // console.log(nletter);
                return res.status(200).json(nletter);
            } else{
                console.log("is registered");
                return res.json( "This email address is already registered");
            }
           
        })
    } catch (error) {
        console.log(error)
        res.status(400).send("add email address failed")
    }
})

// rmove an email from a newsletter
router.get('/nletter/mails/remove/:listId/:email', async (req, res) => {
    console.log("req.params",req.params);
    try { 
        const {listId, email} = req.params;
        Nletter.findById(listId, (err, nletter) => {
            // console.log(nletter);
            console.log(err);
            nletter.emails = nletter.emails.filter(mail => mail !== email);
            nletter.save();
            // console.log(" after deleted", nletter);
            return res.status(200).send("your email removed succesfuly");
            
        })
    } catch (error) {
        res.status(400).send("your email faild to removed")
    }
})

// send mail to al newsletter users 
router.post('/nletter/sendmail',upload.array('files', 12),isLoged, isAdmin, async (req, res) =>{
    const {_id, subject, title, text} = req.body;
    const atach = req.files.map(file => {
        const attachment = fs.readFileSync(`uploads/${file.originalname}`).toString("base64");
        return({content: attachment, filename: file.originalname, disposition: "attachment"})
    });
    const htmail = (title, src, text, endRemove) => (
        `<div style="
            background-color: aliceblue;
            text-align: center;
            border: solid 1px;
            padding: 5vw;
            margin: auto;
            width: 550px;">
            <img width='200px' src="https://hellomeir.com/upload/images/${src}" />
            <h1>${title}</h1>
            <p style="
                font-size: 20px;
                letter-spacing: 0.3px;">
                ${text}
            </p>
        </div>
        <a style=" 
            display: block;
            margin: auto;
            text-align:center;
            width: fit-content;
            padding: 7px 15px;
            color: white;
            background-color: #c51d1d;
            border-radius: 50px;
            cursor: pointer;
            margin-top:20px;
            text-decoration:none;"

            href='http://localhost:4000/api/nletter/mails/remove/${endRemove}'
            >

            remove me from list
        </a>`
    )
    try {
        Nletter.findById(_id).exec((err, nletter) => {
            if(err) return res.status(400).json("something error happened");
            console.log('nletter from route send mail',nletter);
            nletter.emails.forEach(mail => {
                sendMail(nletter.name, mail,subject,htmail(title,nletter.logo,text,`${nletter._id}/${mail}`),atach);
            });
            res.status(200).json(nletter)
        })
    } catch (error) {
        res.status(400).send("newsletter updated failed")
    }
})


// // get the emails list from a newsletter
// router.get('/nletter/mails/remove/:listId/:email', async (req, res) => {
//     console.log("req.params",req.params);
//     try { 
//         const {listId, email} = req.params;
//         Nletter.findById(listId, (err, nletter) => {
//             console.log(nletter);
//             nletter.emails = nletter.emails.filter(mail => mail !== email);
//             nletter.save();
//             console.log(nletter);
//             return res.status(200).json("your email removed succesfuly");
            
//         })
//     } catch (error) {
//         res.status(400).send("your email faild to removed")
//     }
// })


module.exports = router;