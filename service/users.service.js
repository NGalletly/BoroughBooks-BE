const {
  modelGetUsers,
  modelGetUserByUsername,
  modelGetBooksByUsername,
  modelGetFriendsByUsername,
} = require("../model/users.model");

exports.serviceGetUsers = async () => {
  return await modelGetUsers();
};

exports.serviceGetUserByUsername = async (username) => {
  return await modelGetUserByUsername(username);
};
exports.serviceGetBooksByUsername = async (username) => {
  return await modelGetBooksByUsername(username);
};

exports.serviceGetFriendsByUsername = async (username) => {
  return await modelGetFriendsByUsername(username);
};
