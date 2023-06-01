const express = require("express");
const userRoutes = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");

userRoutes.post("/", async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const userName = await User.findOne({
    email: req.body.email,
  });

  const userMail = await User.findOne({
    username: req.body.username,
  });

  if (userName) {
    res.status(400).send("user already exist");
    return;
  } else if (userMail) {
    res.status(400).send("user already exist");
    return;
  }

  const newUser = new User(_.pick(req.body, ["username", "password", "email"]));

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save();
  const token = newUser.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(newUser, ["username", "email", "_id"]));
});

module.exports = userRoutes;
