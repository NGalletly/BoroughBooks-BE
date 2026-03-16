const {
  modelGetUsers,
  modelGetUserByUsername,
  modelGetBorrowedBooksByUsername,
  modelGetLoanedBooksByUsername,
  modelGetBooksByUsername,
  modelPostBooksByUsername,
  modelGetFriendsByUsername,
  modelGetWishListByUsername,
  modelPostLoanByUserBookId,
  modelDeleteBookByisbn,
} = require("../model/users.model");

exports.serviceGetUsers = async () => {
  return await modelGetUsers();
};

exports.serviceGetUserByUsername = async (username) => {
  return await modelGetUserByUsername(username);
};

exports.serviceGetBorrowedBooksByUsername = async (username) => {
  return await modelGetBorrowedBooksByUsername(username);
};

exports.serviceGetLoanedBooksByUsername = async (username) => {
  return await modelGetLoanedBooksByUsername(username);
};

exports.serviceGetBooksByUsername = async (username) => {
  return await modelGetBooksByUsername(username);
};

exports.servicePostBooksByUsername = async (username, isbn) => {
  return await modelPostBooksByUsername(username, isbn);
};

exports.serviceGetFriendsByUsername = async (username) => {
  return await modelGetFriendsByUsername(username);
};

exports.serviceGetWishListByUsername = async (username) => {
  return await modelGetWishListByUsername(username);
};

exports.servicePostLoanByUserBookId = async (users_book_id, borrower_id) => {
  return await modelPostLoanByUserBookId(users_book_id, borrower_id);
};
exports.serviceDeleteBookByisbn = async (username, isbn) => {
  const result = await modelDeleteBookByisbn(username, isbn);
  if (result.rowCount === 0) {
    const err = new Error("Book not found in user library");
    err.status = 404;
    throw err;
  }
  return result;
};
