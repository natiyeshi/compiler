const joi = require('@hapi/joi');

let userRegisterSchema = joi.object({
    name:joi.string().min(3).max(15).required()
})

module.exports = {userRegisterSchema}