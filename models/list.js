const mongoose = require("mongoose");
const Joi = require("joi");

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
});

const List = new mongoose.model("List", listSchema);

const validateList = function (list) {
  const schema = Joi.object({
    name: Joi.string().required(),
    time: Joi.string().required(),
  });

  return schema.validate(list);
};

module.exports.List = List;
module.exports.validateList = validateList;
