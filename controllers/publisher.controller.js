const { response } = require("express");
const PublisherModel = require("../models/publisher.model.js");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');

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
  verify: async(req, res) => {
    const {token} = req.params;
  },
  register: async (req, res) => {
    const candidate = await PublisherModel.findOne({ email: req.body.email });
    if (candidate) {
      res.status(400).send("This account already exists!");
    } else {
      const hashPassword = await bcrypt.hash(req.body.password, 3);
      req.body.password = hashPassword;
      const newPublisher = new PublisherModel(req.body);

      //token generation
      const token = jwt.sign({email: req.body.email}, "SECRET_KEY", {expiresIn: '1h'})
      res.cookie("token", token, {httpOnly: true, secure: true});

      //email with token
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.net",
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: "asmer.hasanli@gmail.com",
          pass: "jqyl afkb szml qfza",
        },
      });

      const mailData = {
        from: "newsandbolgs.time@gmail.com",
        to: req.body.email,
        subject: "Verify your Email Address (News&Blogs)",
        text: "Welcome to News&Blogs!",
        html:`Clock to verify your email account: http://localhost:8080/api/publishers/verify/${token}`,
      }

      await transporter.sendMail(mailData);

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


