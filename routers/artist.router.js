const express = require('express');
const UserAuthMiddleware = require('../middlewares/user.middleware.js') 
const artis_router = express.Router();
const artist_controller = require('../controllers/user.controller');

artis_router.get('/', artist_controller.getAll);

artis_router.get(':id', artist_controller.getOne);

artis_router.post('/', UserAuthMiddleware,artist_controller.register);

artis_router.delete('/:id', artist_controller.delete);

artis_router.patch(':id', artist_controller.edit);

module.exports = artis_router;