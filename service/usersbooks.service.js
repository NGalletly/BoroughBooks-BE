const { modelGetBooksByUsername } = require("../model/usersbooks.model");

exports.serviceGetBooksByUsername = (username) => {
  return modelGetBooksByUsername(username);
};
