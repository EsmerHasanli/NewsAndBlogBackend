const PublisherValidation = require('../validations/publisher.validation.js')

const PublisherAuthMiddleware = (req,res,next)=>{
    const {error} = PublisherValidation.validate(req.body);
     if(!error){
      next();
     }
     else{
      const {details} = error
      const message = details[0].message
      res.send({message});
     }
  }

  module.exports = PublisherAuthMiddleware;