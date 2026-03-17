const db = require("../db/connection");

exports.modelCheckBookExists = async (isbn) => {
  const { rows } = await db.query(`SELECT * FROM books WHERE isbn = $1`, [
    isbn,
  ]);
  return rows;
};

exports.modelGetBooks = async () => {
  const { rows } = await db.query(`SELECT * FROM books`);
  return rows;
};

exports.modelGetBookByIsbn = async (isbn) => {
  const { rows } = await db.query(`SELECT * FROM books WHERE isbn=$1`, [isbn]);
  return rows;
};

exports.modelPostBook = async (postBook) => {
  const {
    isbn,
    title,
    authors,
    publisher,
    published_date,
    description,
    imagelinks,
  } = postBook;
  const { rows } = await db.query(
    `INSERT INTO books(
    isbn,
    title,
    authors,
    publisher,
    published_date,
    description,
    imagelinks) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [isbn, title, authors, publisher, published_date, description, imagelinks],
  );
  return rows[0];
};
