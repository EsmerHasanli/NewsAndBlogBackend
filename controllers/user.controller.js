const mongoose = require("mongoose");
const UserModel = require("../models/user.model.js");
const bcrypt = require('bcrypt');


const user_controller = {
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
    console.log(id);

    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await UserModel.findOne({ _id: id });
      if (user) {
        res.status(200).send(user);
      } else res.status(404).send("Not Found!");
    } else res.status(400).send("Bad Request!");
  },

  register: async (req, res) => {
    console.log(req.body);
    const candidate = await UserModel.findOne({ email: req.body.email });
    if (candidate) {
      res.status(400).send("This account already exists!");
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 3);
      req.body.password = hashPassword;
      const newUser = new UserModel(req.body);
      newUser.save();
      res.status(201).send({
        message: "data posted successfully",
        data: newUser,
      });
    }
  },
  login: async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email:email})
    if (!user) {
      res.send({message:'invalid credentials or unverified account'})
      return;
    }
    const decryptedPass = bcrypt.compare(password,user.password)
    if(!user.isVerified || !decryptedPass){
      res.send({message:'invalid credentials or unverified account'})
      return;
    }
    else{
      res.send({message:'welcome'})
    }
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

module.exports = user_controller;
