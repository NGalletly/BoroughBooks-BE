const {
  serviceGetUsers,
  serviceGetUserByUsername,
  serviceGetBorrowedBooksByUsername,
  serviceGetLoanedBooksByUsername,
  serviceGetBooksByUsername,
  serviceGetUserBookByIsbn,
  servicePostBooksByUsername,
  serviceGetFriendsByUsername,
  servicePostFriendByUsername,
  servicePatchFriendByUsername,
  serviceGetWishListByUsername,
  servicePostLoanByUserBookId,
  serviceDeleteBookByisbn,
  serviceUpdateLoanedBookByLoanId,
  serviceDeleteFriendByUserRelatId,
} = require("../service/users.service");

exports.controllerGetUsers = async (request, response, next) => {
  try {
    const users = await serviceGetUsers();
    response.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.controllerGetUserByUsername = async (request, response, next) => {
  try {
    const { username } = request.params;
    const user = await serviceGetUserByUsername(username);
    response.status(200).send({ user });
  } catch (err) {
    next(err);
  }
};

exports.controllerGetBorrowedBooksByUsername = async (
  request,
  response,
  next,
) => {
  try {
    const { username } = request.params;
    const books = await serviceGetBorrowedBooksByUsername(username);
    response.status(200).send({ books });
  } catch (err) {
    next(err);
  }
};

exports.controllerGetLoanedBooksByUsername = async (
  request,
  response,
  next,
) => {
  try {
    const { username } = request.params;
    const books = await serviceGetLoanedBooksByUsername(username);
    response.status(200).send({ books });
  } catch (err) {
    next(err);
  }
};

exports.controllerGetBooksByUsername = async (request, response, next) => {
  try {
    const { username } = request.params;
    const books = await serviceGetBooksByUsername(username);
    response.status(200).send({ books });
  } catch (err) {
    next(err);
  }
};

exports.controllerGetUserBookByIsbn = async (request, response, next) => {
  try {
    const { username, isbn } = request.params;
    const usersBookByIsbn = await serviceGetUserBookByIsbn(username, isbn);
    response.status(200).send({ usersBookByIsbn });
  } catch (err) {
    next(err);
  }
};
exports.controllerPostBooksByUsername = async (request, response, next) => {
  try {
    const { isbn } = request.body;
    const { username } = request.params;
    const postedBookToLibrary = await servicePostBooksByUsername(
      username,
      isbn,
    );
    response.status(201).send({ postedBookToLibrary });
  } catch (err) {
    next(err);
  }
};

exports.controllerGetFriendsByUsername = async (request, response, next) => {
  try {
    const { username } = request.params;
    const usersFriends = await serviceGetFriendsByUsername(username);
    response.status(200).send({ usersFriends });
  } catch (err) {
    next(err);
  }
};

exports.controllerPostFriendByUsername = async (request, response, next) => {
  try {
    const { username } = request.params;
    const { relating_username } = request.body;
    const usersNewFriendRequest = await servicePostFriendByUsername(
      username,
      relating_username,
    );
    response.status(201).send({ usersNewFriendRequest });
  } catch (err) {
    next(err);
  }
};

exports.controllerPatchFriendByUsername = async (request, response, next) => {
  try {
    const { user_relationship_id } = request.body;
    const usersAcceptedFriendRequest =
      await servicePatchFriendByUsername(user_relationship_id);
    response.status(202).send({ usersAcceptedFriendRequest });
  } catch (err) {
    next(err);
  }
};

exports.controllerGetWishListByUsername = async (request, response, next) => {
  try {
    const { username } = request.params;
    const usersWishList = await serviceGetWishListByUsername(username);
    response.status(200).send({ usersWishList });
  } catch (err) {
    next(err);
  }
};

exports.controllerPostLoanByUserBookId = async (request, response, next) => {
  try {
    const { users_book_id, borrower_id } = request.body;
    const newLoan = await servicePostLoanByUserBookId(
      users_book_id,
      borrower_id,
    );
    response.status(201).send({ newLoan });
  } catch (err) {
    next(err);
  }
};
exports.controllerDeleteBookByisbn = async (request, response, next) => {
  try {
    const { username, isbn } = request.params;
    await serviceDeleteBookByisbn(username, isbn);
    response.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.controllerUpdateLoanedBookByLoanId = async (
  request,
  response,
  next,
) => {
  const { loan_id, return_date } = request.body;
  if (!loan_id || !return_date) {
    return response.status(400).send({
      msg: "One or more fields are missing to perform loan return",
    });
  }
  try {
    await serviceUpdateLoanedBookByLoanId(loan_id, return_date);
    response.status(204).send();
  } catch (err) {
    response.status(404).send({ msg: "Loan not found" });
  }
};

exports.controllerDeleteFriendByUserRelatId = async (
  request,
  response,
  next,
) => {
  try {
    const { user_relationship_id } = request.params;
    await serviceDeleteFriendByUserRelatId(user_relationship_id);
    response.status(204).send();
  } catch (err) {
    response.status(404).send({ msg: "Friend relationship not found" });
    next(err);
  }
};
