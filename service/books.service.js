const { modelGetBooksByUsername } = require("../usersbooks.model");

exports.serviceGetBooksByUsername = async (username) => {
  const books = await modelGetBooksByUsername(username);

  if (books.length === 0) {
    return Promise.reject({ status: 404, msg: "No books found for this user" });
  }

  return books;
};
