const {
  serviceGetUsers,
  serviceGetBooksByUsername,
  serviceGetFriendsByUsername,
} = require("../service/users.service");

exports.controllerGetUsers = async (request, response, next) => {
  try {
    const users = await serviceGetUsers();
    response.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.controllerGetBooksByUsername = async (request, response, next) => {
  console.log("Request received for username:", request.params.username);
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
