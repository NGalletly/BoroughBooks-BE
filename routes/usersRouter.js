const express = require("express");
const usersbooksRouter = express.Router({ mergeParams: true });
const {
  controllerGetUsers,
  controllerGetUserByUsername,
  controllerGetLoanedBooksByUsername,
  controllerGetBooksByUsername,
  controllerGetFriendsByUsername,
  controllerGetWishListByUsername,
} = require("../controller/users.controller");

usersbooksRouter.get("/", controllerGetUsers);
usersbooksRouter.get("/:username", controllerGetUserByUsername);
usersbooksRouter.get("/:username/loans", controllerGetLoanedBooksByUsername);
usersbooksRouter.get("/:username/my-library", controllerGetBooksByUsername);
usersbooksRouter.get("/:username/friends", controllerGetFriendsByUsername);
usersbooksRouter.get("/:username/wish-list", controllerGetWishListByUsername);

module.exports = usersbooksRouter;
