const express = require('express');
const publisher_router = express.Router();
const publisher_controller = require('../controllers/publisher.controller');
const PublisherAuthMiddleware = require('../middlewares/publisher.middleware.js');

publisher_router.get('/', publisher_controller.getAll);

publisher_router.get('/:id', publisher_controller.getOne);

publisher_router.post('/', PublisherAuthMiddleware,publisher_controller.register);

publisher_router.get('/verify/:token', publisher_controller.verify);

publisher_router.post('/login', PublisherAuthMiddleware,publisher_controller.login);

module.exports = publisher_router;