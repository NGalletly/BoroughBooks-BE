const {
  modelGetUsers,
  modelGetBooksByUsername,
} = require("../model/users.model");

exports.serviceGetUsers = async () => {
  return await modelGetUsers();
};

exports.serviceGetBooksByUsername = async (username) => {
  return await modelGetBooksByUsername(username);
};
