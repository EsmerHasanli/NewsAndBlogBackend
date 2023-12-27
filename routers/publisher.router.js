const express = require('express');
const publisher_router = express.Router();
const publisher_controller = require('../controllers/publisher.controller');

publisher_router.get('/', publisher_controller.getAll);

publisher_router.get(':id', publisher_controller.getOne);

publisher_router.post('/', publisher_controller.register);

module.exports = publisher_router;