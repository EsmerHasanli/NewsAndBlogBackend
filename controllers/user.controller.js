const UserModel = require("../models/user.model.js");

const artist_controller = {
  getAll: async (req, res) => {
    const users = await UserModel.find({});
    if (users.length == 0) {
      res.status(204).send({
        message: "empty array",
      });
    } else {
      res.status(200).send({
        message: "succes",
        data: users,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const data = await UserModel.findById(id);
    if (data !== undefined) {
      res.status(200).send(data);
    } else {
      res.status(204).send({message: "data not found!"});
    }
  },  
  register: async (req, res) => {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).send({
      message: "data posted successfully",
      data: newUser,
    });
  },
  delete: async (req, res) => {
    const { _id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(_id);
    const users = await UserModel.find({});
    if (deletedUser === -1) {
      res.send({
        message: "data not found!",
      });
    } else {
      res.status(200).send({
        message: "data deleted successfully",
        data: users,
      });
    }
  },
  edit: async (req, res) => {
    const { _id } = req.params;
    await UserModel.findByIdAndUpdate(_id, req.body);
    const updatedUser = await UserModel.findById(id);
    res.send(updatedUser);
  },
};

module.exports = artist_controller;
