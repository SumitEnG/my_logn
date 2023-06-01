const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 300,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 30,
    unique: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.jwtPrivateKey
  );
  return token;
};

const User = new mongoose.model("User", userSchema);

const validateUser = function (user) {
  const schema = Joi.object({
    username: Joi.string().required().min(5).max(20),
    password: Joi.string().required().min(5).max(300),
    email: Joi.string().required().min(5).max(30).email(),
  });
  return schema.validate(user);
};

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.userSchema = userSchema;
