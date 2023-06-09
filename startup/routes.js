module.exports = function (app) {
  const userRoutes = require("../routes/user");
  const authRoutes = require("../routes/auth");
  const listRoutes = require("../routes/list");
  const error = require("../middleware/error");

  app.use("/api/register", userRoutes);
  app.use("/api/login", authRoutes);
  app.use("/api/list", listRoutes);
  app.use(error);
};
