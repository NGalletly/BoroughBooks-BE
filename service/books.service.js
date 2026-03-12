const {
  modelGetBooks,
  modelPostBook,
  modelCheckBookExists,
} = require("../model/books.model");

exports.serviceGetBooks = async () => {
  return await modelGetBooks();
};

exports.servicePostBook = async (postBook) => {
  const rows = await modelCheckBookExists(postBook.isbn);
  if (rows.length > 0) {
    return Promise.reject({ status: 409, msg: "Book already exists." });
  }
  return await modelPostBook(postBook);
};
