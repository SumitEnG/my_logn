const express = require("express");
const listRoutes = express.Router();
const _ = require("lodash");
const { List, validateList } = "../models/list";

listRoutes.post("/", async (req, res) => {
  const result = validateList();
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  const list = new List(_.pick(req.body, ["name", "time"]));
  await list.save();
  res.send(list);
});

module.exports = listRoutes;
