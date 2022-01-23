const jwt = require('jsonwebtoken');
const Nletter = require('../model/nletter');
const User = require('../model/user');

exports.isLoged = async(req, res, next) => {
    console.log("authorization", req.headers.authorization);
    const idFromToken = jwt.decode(req.headers.authorization)._id;
    if(!idFromToken) return res.status(400).json({err: "you need to signin"});
    const user = await User.findById(idFromToken);
    if(!user) return res.status(400).json({err: "there is not a legal user"});
    req.user = user;
    req.tokenId = idFromToken;
    console.log("is loged in");
    next();
}

// exports.isAuth = (req, res, next) => {
//     const user = req.body.authorId && req.token && req.body.authorId == req.token;
//     if(!user) return res.status(400).json({err: "you can't continue"})
//     next();
// }

exports.isAdmin = async (req,res,next) => {

    let listId = req.query._id ? req.query._id : req.body._id;
    console.log("req.files from isAdmin",req.files);
    console.log("req.query from isAdmin",req.query);
    console.log("req.body from isAdmin",req.body); 
    console.log("listId",listId);
    const nletter = await Nletter.findOne({_id: listId, parent: req.tokenId}).exec();
    console.log('nLetter from isAdmin', nletter);
    if (!nletter){
        return res.status(403).json({err:"for Admin only"})
    }
    next()
}