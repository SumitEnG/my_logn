const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { userSchema } = require("./user");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    required: true,
  },
  user: {
    type: userSchema,
    required: true,
  },
});

const List = new mongoose.model("List", listSchema);

const validateList = function (list) {
  const schema = Joi.object({
    name: Joi.string().required(),
    time: Joi.string().required(),
    userId: Joi.objectId().required(),
  });

  return schema.validate(list);
};

module.exports.List = List;
module.exports.validateList = validateList;
module.exports.listSchema = listSchema;
