const { modelGetBooksByUsername } = require("../model/users.model");

exports.serviceGetBooksByUsername = (username) => {
  return modelGetBooksByUsername(username);
};
