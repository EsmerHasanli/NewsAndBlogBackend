const express = require('express');
const news_router = express.Router();
const news_controller = require('../controllers/news.controller');

news_router.get('/', news_controller.getAll);

news_router.get('publishers/:id', news_controller.getOne);

news_router.get('news/:id', news_controller.getOne);

news_router.post('/', news_controller.post);

news_router.delete('/:id', news_controller.delete);

module.exports = news_router;