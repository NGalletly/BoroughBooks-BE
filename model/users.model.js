const db = require("../db/connection");

exports.modelGetUsers = async () => {
  const { rows } = await db.query(`SELECT * FROM users`);
  return rows;
};

exports.modelGetBooksByUsername = async (username) => {
  const { rows } = await db.query(
    `SELECT books.* FROM books
     JOIN users_books ON books.isbn = users_books.isbn
     WHERE users_books.username = $1`,
    [username],
  );
  return rows;
};
