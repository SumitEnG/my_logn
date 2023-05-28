const express = require("express");
const authRoutes = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

authRoutes.post("/", async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const user = await User.findOne({
    username: req.body.username,
  });

  if (!user) {
    res.status(400).send("invalid username or password");
    return;
  }

  const validPass = bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    res.status(400).send("invalid username or password");
    return;
  }

  const token = user.generateAuthToken();
  res.send({
    token: token,
    username: user.username,
  });
});

const validateUser = function (user) {
  const schema = Joi.object({
    username: Joi.string().required().min(5).max(20),
    password: Joi.string().required().min(5).max(300),
  });
  return schema.validate(user);
};

module.exports = authRoutes;
