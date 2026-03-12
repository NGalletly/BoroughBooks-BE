const { modelGetBooks } = require("../model/books.model");

exports.serviceGetBooks = async () => {
  return await modelGetBooks();
};
