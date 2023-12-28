const Joi = require('joi');

const NewsValidation = Joi.object({
    publisherId:Joi.string(),
    title: Joi.string().min(3).max(20).required(),
    image: Joi.string().array(),
    body: Joi.string().min(2).max(50).optional(),
    createdAt : Joi.date(),  
})
  
  module.exports = NewsValidation
