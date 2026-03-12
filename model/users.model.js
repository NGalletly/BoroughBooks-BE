const db = require("../db/connection");

exports.modelGetUsers = async () => {
  const { rows } = await db.query(`SELECT * FROM users`);
  return rows;
};

exports.modelGetLoanedBooksByUsername = async (username) => {
  const { rows } = await db.query(
    `SELECT books.* FROM books
     JOIN users_books ON books.isbn = users_books.isbn
     WHERE users_books.username = $1`,
    [username],
  );
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
exports.modelGetUserByUsername = async (username) => {
  const { rows } = await db.query(
    `SELECT * FROM users
     WHERE users.username = $1`,
    [username],
  );
  return rows;
};

exports.modelGetFriendsByUsername = async (username) => {
  const { rows } = await db.query(
    `SELECT user_relationship.*, users.profile_pic_url FROM user_relationship JOIN users on user_relationship.origin_username = users.username WHERE user_relationship.origin_username = $1 AND user_relationship.friend_status = 'accepted'`,
    [username],
  );
  return rows;
};
