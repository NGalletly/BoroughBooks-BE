const express = require("express");
const usersbooksRouter = express.Router({ mergeParams: true });
const {
  controllerGetBooksByUsername,
} = require("../controller/usersbooks.controller");

usersbooksRouter.get("/:username/my-library", controllerGetBooksByUsername);

module.exports = usersbooksRouter;
