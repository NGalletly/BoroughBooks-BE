const { modelGetBooks } = require("../model/books.model");

exports.serviceGetUsers = async () => {
  return await modelGetBooks();
};
