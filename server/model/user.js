const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const SHA256 = require("crypto-js/sha256");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        unique: true
    },
    hashPasword:{
        type: String,
        required: true,
    },
    salt: String,
    role: {
        type:Number,
        default: 0
    }
},{timestamps:true})

userSchema.virtual('password').set(function(password) {
    this.salt=uuidv4();
    this.hashPasword = this.encryptPassword(password)
}).get( function() {
    // return password
})
userSchema.methods = {
    checkPassword: function(password){
        return this.encryptPassword(password) == this.hashPasword;
    },
    encryptPassword: function(password){
        if (!password) return '';
        try{
            return SHA256(password,this.salt);
        } catch (err){
            return err
        }
    }
}

module.exports = mongoose.model("User", userSchema)