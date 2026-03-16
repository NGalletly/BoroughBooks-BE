const {
  modelGetUsers,
  modelGetUserByUsername,
  modelGetBorrowedBooksByUsername,
  modelGetLoanedBooksByUsername,
  modelGetBooksByUsername,
  modelPostBooksByUsername,
  modelGetFriendsByUsername,
  modelPostFriendByUsername,
  modelGetWishListByUsername,
  modelPostLoanByUserBookId,
  modelDeleteBookByisbn,
  modelUpdateLoanedBookByLoanId,
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

exports.servicePostFriendByUsername = async (username, relating_username) => {
  return await modelPostFriendByUsername(username, relating_username);
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

exports.serviceUpdateLoanedBookByLoanId = async (loan_id, return_date) => {
  const updatedLoan = await modelUpdateLoanedBookByLoanId(loan_id, return_date);
  if (!updatedLoan) throw new Error("Loan not found");
  return updatedLoan;
};
