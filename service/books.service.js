const {
  modelGetBooks,
  modelGetBookByIsbn,
  modelPostBook,
  modelCheckBookExists,
} = require("../model/books.model");

exports.serviceGetBooks = async () => {
  return await modelGetBooks();
};

exports.serviceGetBookByIsbn = async (isbn) => {
  return await modelGetBookByIsbn(isbn);
};

exports.servicePostBook = async (postBook) => {
  const rows = await modelCheckBookExists(postBook.isbn);
  if (rows.length > 0) {
    return Promise.reject({ status: 409, msg: "Book already exists." });
  }
  return await modelPostBook(postBook);
};
