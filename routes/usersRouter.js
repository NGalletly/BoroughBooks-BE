const express = require("express");
const usersbooksRouter = express.Router({ mergeParams: true });
const {
  controllerGetUsers,
  controllerGetUserByUsername,
  controllerGetBorrowedBooksByUsername,
  controllerGetLoanedBooksByUsername,
  controllerGetBooksByUsername,
  controllerGetFriendsByUsername,
  controllerGetWishListByUsername,
  controllerPostLoanByUserBookId,
} = require("../controller/users.controller");

usersbooksRouter.get("/", controllerGetUsers);
usersbooksRouter.get("/:username", controllerGetUserByUsername);

usersbooksRouter.get(
  "/:username/borrowed",
  controllerGetBorrowedBooksByUsername,
);
usersbooksRouter.get("/:username/loaned", controllerGetLoanedBooksByUsername);
usersbooksRouter.get("/:username/my-library", controllerGetBooksByUsername);
usersbooksRouter.get("/:username/friends", controllerGetFriendsByUsername);
usersbooksRouter.get("/:username/wish-list", controllerGetWishListByUsername);

usersbooksRouter.post("/:username/loaned", controllerPostLoanByUserBookId);

module.exports = usersbooksRouter;
