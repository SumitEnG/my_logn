const error = function (err, req, res, next) {
  res.status(500).send("something failed");
};
module.exports = error;
