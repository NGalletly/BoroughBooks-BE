const { serviceGetBooks } = require("../service/books.service");

exports.controllerGetBooks = async (request, response, next) => {
  try {
    const books = await serviceGetBooks();
    response.status(200).send({ books });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
