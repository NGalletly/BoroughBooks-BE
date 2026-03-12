const express = require("express");
const usersbooksRouter = express.Router({ mergeParams: true });
const {
  controllerGetUsers,
  controllerGetUserByUsername,
  controllerGetLoanedBooksByUsername,
  controllerGetBooksByUsername,
  controllerGetFriendsByUsername,
} = require("../controller/users.controller");

usersbooksRouter.get("/", controllerGetUsers);
usersbooksRouter.get("/:username", controllerGetUserByUsername);
usersbooksRouter.get("/:username/loans", controllerGetLoanedBooksByUsername);
usersbooksRouter.get("/:username/my-library", controllerGetBooksByUsername);
usersbooksRouter.get("/:username/friends", controllerGetFriendsByUsername);

module.exports = usersbooksRouter;
