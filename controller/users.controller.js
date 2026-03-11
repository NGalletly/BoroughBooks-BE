const { serviceGetBooksByUsername } = require("../service/users.service");

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
