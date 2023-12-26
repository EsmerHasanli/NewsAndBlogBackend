const express = require('express');
const UserAuthMiddleware = require('../middlewares/user.middleware.js') 
const user_router = express.Router();
const artist_controller = require('../controllers/user.controller');

user_router.get('/', artist_controller.getAll);

user_router.get(':id', artist_controller.getOne);

user_router.post('/', UserAuthMiddleware,artist_controller.register);

user_router.delete('/:id', artist_controller.delete);

user_router.patch(':id', artist_controller.edit);

module.exports = user_router;