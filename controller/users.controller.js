const {
  serviceGetUsers,
  serviceGetUserByUsername,
  serviceGetBorrowedBooksByUsername,
  serviceGetLoanedBooksByUsername,
  serviceGetBooksByUsername,
  serviceGetFriendsByUsername,
  serviceGetWishListByUsername,
  servicePostLoanByUserBookId,
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

exports.controllerGetFriendsByUsername = async (request, response, next) => {
  try {
    const { username } = request.params;
    const usersFriends = await serviceGetFriendsByUsername(username);
    response.status(200).send({ usersFriends });
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
    const { user_book_id } = request.params;
    const newLoan = await servicePostLoanByUserBookId(
      user_book_id,
      borrower_id,
    );
    response.status.send({ loan: createdLoan });
  } catch (err) {
    next(err);
  }
};
