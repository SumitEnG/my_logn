const express = require("express");
const listRoutes = express.Router();
const _ = require("lodash");
const { List, validateList } = require("../models/list");
const mongoose = require("mongoose");
const { User } = require("../models/user");

listRoutes.get("/", async (req, res) => {
  const list = await List.find(List.user._id == req.body.userId);
  res.send(list);
});

listRoutes.post("/", async (req, res) => {
  const result = validateList(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const user = await User.findById(req.body.userId);

  if (!user) {
    res.status(400).send("invalid user");
    return;
  }

  const list = new List({
    name: req.body.name,
    time: req.body.time,
    user: user,
  });
  await list.save();
  res.send(list);
});

listRoutes.put("/:id", async (req, res) => {
  const result = validateList(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const list = await List.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      time: req.body.time,
    },
    {
      new: true,
    }
  );

  console.log(list);

  if (!list) {
    res.status(400).send("invalid task");
    return;
  }

  res.send(list);
});

listRoutes.delete("/:id", async (req, res) => {
  const list = await List.findByIdAndDelete(req.params.id);

  if (!list) {
    res.status(400).send("invalid task");
    return;
  }

  res.send("deleted successfully");
});
module.exports = listRoutes;
