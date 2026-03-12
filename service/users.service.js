const {
  modelGetUsers,
  modelGetUserByUsername,
  modelGetBooksByUsername,
  modelGetFriendsByUsername,
  modelGetWishListByUsername,
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

exports.serviceGetWishListByUsername = async (username) => {
  return await modelGetWishListByUsername(username);
};
