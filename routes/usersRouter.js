const express = require("express");
const usersbooksRouter = express.Router({ mergeParams: true });
const {
  controllerGetUsers,
  controllerGetUserByUsername,
  controllerGetBorrowedBooksByUsername,
  controllerGetLoanedBooksByUsername,
  controllerGetBooksByUsername,
  controllerGetUserBookByIsbn,
  controllerPostBooksByUsername,
  controllerGetFriendsByUsername,
  controllerPostFriendByUsername,
  controllerPatchFriendByUsername,
  controllerGetWishListByUsername,
  controllerDeleteWishListBookByUsername,
  controllerPostLoanByUserBookId,
  controllerDeleteBookByisbn,
  controllerUpdateLoanedBookByLoanId,
  controllerDeleteFriendByUserRelatId,
} = require("../controller/users.controller");

usersbooksRouter.get("/", controllerGetUsers);
usersbooksRouter.get("/:username", controllerGetUserByUsername);

usersbooksRouter.get(
  "/:username/borrowed",
  controllerGetBorrowedBooksByUsername,
);
usersbooksRouter.get("/:username/loaned", controllerGetLoanedBooksByUsername);
usersbooksRouter.get("/:username/my-library", controllerGetBooksByUsername);
usersbooksRouter.get(
  "/:username/my-library/:isbn",
  controllerGetUserBookByIsbn,
);
usersbooksRouter.post("/:username/my-library", controllerPostBooksByUsername);
usersbooksRouter.get("/:username/friends", controllerGetFriendsByUsername);
usersbooksRouter.post("/:username/friends", controllerPostFriendByUsername);
usersbooksRouter.patch("/:username/friends", controllerPatchFriendByUsername);
usersbooksRouter.get("/:username/wish-list", controllerGetWishListByUsername);
usersbooksRouter.delete(
  "/:username/wish-list/:isbn",
  controllerDeleteWishListBookByUsername,
);

usersbooksRouter.post("/:username/loaned", controllerPostLoanByUserBookId);
//Delete
//http://localhost:9000/api/users/gavinHousley/my-library/9780140154511
usersbooksRouter.delete(
  "/:username/my-library/:isbn",
  controllerDeleteBookByisbn,
);

usersbooksRouter.patch("/:username/loaned", controllerUpdateLoanedBookByLoanId);

usersbooksRouter.delete(
  "/:username/friends",
  controllerDeleteFriendByUserRelatId,
);

module.exports = usersbooksRouter;
