const error = function (err, req, res, next) {
  res.status(500).send(err.message);
  console.log(err);
};
module.exports = error;
