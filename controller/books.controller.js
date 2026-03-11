const { serviceGetBooksByUsername } = require("../usersbooks.service");

exports.controllerGetBooksByUsername = async (request, response, next) => {
  try {
    const { username } = request.params;
    const books = await serviceGetBooksByUsername(username); // fixed
    response.status(200).send({ books });
  } catch (err) {
    next(err);
  }
};
