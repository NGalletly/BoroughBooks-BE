const {
  modelGetUsers,
  modelGetUserByUsername,
  modelGetBorrowedBooksByUsername,
  modelGetLoanedBooksByUsername,
  modelGetBooksByUsername,
  modelGetFriendsByUsername,
  modelGetWishListByUsername,
  modelPostLoanByUserBookId,
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

exports.serviceGetFriendsByUsername = async (username) => {
  return await modelGetFriendsByUsername(username);
};

exports.serviceGetWishListByUsername = async (username) => {
  return await modelGetWishListByUsername(username);
};

exports.servicePostLoanByUserBookId = async (users_book_id, borrower_id) => {
  return await modelPostLoanByUserBookId(users_book_id, borrower_id);
};
