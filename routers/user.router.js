const express = require('express');
const UserAuthMiddleware = require('../middlewares/user.middleware.js') 
const user_router = express.Router();
const user_controller = require('../controllers/user.controller.js');

user_router.get('/',user_controller.getAll);

user_router.get('/:id',user_controller.getOne);

user_router.post('/', UserAuthMiddleware ,user_controller.register);

user_router.delete('/:id',user_controller.delete);

user_router.patch('/:id',user_controller.edit);

module.exports = user_router;