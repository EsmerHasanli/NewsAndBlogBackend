const PublisherModel = require("../models/publisher.model.js");

const publisher_controller = {
  getAll: async (req, res) => {
    const publishers = await PublisherModel.find({});
    if (publishers.length == 0) {
      res.status(204).send({
        message: "empty array",
      });
    } else {
      res.status(200).send({
        message: "success",
        data: publishers,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const data = await PublisherModel.findById(id);
    if (data !== undefined) {
      res.status(200).send(data);
    } else {
      res.status(204).send("data not found!");
    }
  },
  register: async (req, res) => {
    const newPublisher = new PublisherModel(req.body);
    await newPublisher.save();
    res.status(201).send({
      message: "data posted successfully",
      data: newPublisher,
    });
  },
};

module.exports = publisher_controller;
