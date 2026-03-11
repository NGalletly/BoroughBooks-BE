const express = require("express");
const usersbooksRouter = express.Router({ mergeParams: true });
const {
  // controllerGetUsers,
  controllerGetBooksByUsername,
} = require("../controller/users.controller");

// usersbooksRouter.get("/", controllerGetUsers);
usersbooksRouter.get("/:username/my-library", controllerGetBooksByUsername);

module.exports = usersbooksRouter;
