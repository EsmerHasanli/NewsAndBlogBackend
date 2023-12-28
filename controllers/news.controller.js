const NewsModel = require('../models/news.model.js')

const news_controller = {
  getAll: async (req, res) => {
    const news = await NewsModel.find({});
    if (news.length == 0) {
      res.status(204).send({
        message: "empty array",
      });
    } else {
      res.status(200).send({
        message: "success",
        data: news,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const data = await NewsModel.findById(id);
    if (data !== undefined) {
      res.status(200).send(data);
    } else {
      res.status(204).send("data not found!");
    }
  },
  post: async (req, res) => {
    const newNews = new NewsModel(req.body);
    await newNews.save();
    res.status(201).send({
      message: "data posted successfully",
      data: newNews,
    });
  },
  delete: async (req, res) => {
    const { _id } = req.params;
    const deleteNews = await NewsModel.findByIdAndDelete(_id);
    const news = await NewsModel.find({});
    if (deleteNews === -1) {
      res.send({
        message: "data not found!",
      });
    } else {
      res.status(200).send({
        message: "data deleted successfully",
        data: news,
      });
    }
  },
};

module.exports = news_controller;
