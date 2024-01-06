const Joi = require('joi');

const PublisherValidation = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
    email: Joi.string().email().required(),
    backgroundImg: Joi.string().uri().optional(),
    profileImg: Joi.string().uri().optional(),
    name: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(2).max(50).optional(),
    joinedDate : Joi.date(),  
    isVerified : Joi.boolean()
})
  
  module.exports = PublisherValidation

