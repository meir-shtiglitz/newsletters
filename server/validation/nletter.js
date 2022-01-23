const Joi = require('joi');

const emailValid = (email) => {
    console.log('email',email);
    const schema = Joi.object({
        email: Joi.string().required().email(),
    })
    return schema.validate(email);  
}
module.exports.emailValid = emailValid;



