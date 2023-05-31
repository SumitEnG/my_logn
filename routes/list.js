const express = require("express");
const listRoutes = express.Router();
const _ = require("lodash");
const { List, validateList } = require("../models/list");
const mongoose = require("mongoose");

let objectId = mongoose.Schema.Types.ObjectId;

listRoutes.get("/", async (req, res) => {
  const list = await List.find();
  res.send(list);
});

listRoutes.post("/", async (req, res) => {
  const result = validateList(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const list = new List(_.pick(req.body, ["name", "time"]));
  await list.save();
  res.send(list);
});

listRoutes.put("/:id", async (req, res) => {
  const result = validateList(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
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

  res.sendStatus("deleted successfully");
});
module.exports = listRoutes;
