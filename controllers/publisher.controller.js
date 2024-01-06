const { response } = require("express");
const PublisherModel = require("../models/publisher.model.js");
const bcrypt = require('bcrypt');

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
    const { _id } = req.params;
    const data = await PublisherModel.findById(_id);
    if (data !== undefined) {
      res.status(200).send(data);
    } else {
      res.status(204).send("data not found!");
    }
  },
  register: async (req, res) => {
    const candidate = await PublisherModel.findOne({ email: req.body.email });
    if (candidate) {
      res.status(400).send("This account already exists!");
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 3);
      req.body.password = hashPassword;
      const newPublisher = new PublisherModel(req.body);
      await newPublisher.save();
      res.status(201).send({
        message: "data posted successfully",
        data: newPublisher,
      });
    }
  },
  login: async (req, res) => {
    const {email, password} = req.body;
    const publisher = await PublisherModel.findOne({email:email})
    if (!publisher) {
      res.send({message:'invalid credentials or unverified account'})
      return;
    }
    const decryptedPass = bcrypt.compare(password,publisher.password)
    if(!publisher.isVerified || !decryptedPass){
      res.send({message:'invalid credentials or unverified account'})
      return;
    }
    else{
      res.send({message:'welcome'})
    }
  },
};

module.exports = publisher_controller;


