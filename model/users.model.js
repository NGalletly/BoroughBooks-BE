const db = require("../db/connection");

exports.modelGetUsers = async () => {
  const { rows } = await db.query(`SELECT * FROM users`);
  return rows;
};

exports.modelGetBorrowedBooksByUsername = async (username) => {
  const { rows } = await db.query(
    `SELECT books.*, users_books.username
     FROM books
     JOIN users_books ON books.isbn = users_books.isbn
    JOIN loans ON users_books.users_book_id = loans.users_book_id
    WHERE loans.borrower_id = $1`,
    [username],
  );
  return rows;
};

exports.modelGetLoanedBooksByUsername = async (username) => {
  const { rows } = await db.query(
    `SELECT books.*, loans.borrower_id
     FROM books
     JOIN users_books ON books.isbn = users_books.isbn
     JOIN loans ON users_books.users_book_id = loans.users_book_id
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

exports.modelGetUserBookByIsbn = async (username, isbn) => {
  const { rows } = await db.query(
    `SELECT users_books.username, books.* FROM users_books
     JOIN books ON users_books.isbn = books.isbn
     WHERE users_books.isbn = $1 AND users_books.username = $2`,
    [isbn, username],
  );
  return rows;
};

exports.modelPostBooksByUsername = async (username, isbn) => {
  const { rows } = await db.query(
    `INSERT INTO users_books (isbn, username) VALUES ($1, $2) RETURNING *`,
    [isbn, username],
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
    `SELECT user_relationship.*, origin_user.profile_pic_url AS origin_profile_pic_url, friend_user.profile_pic_url AS friend_profile_pic_url
    FROM user_relationship
    JOIN users AS origin_user ON user_relationship.origin_username = origin_user.username 
    JOIN users AS friend_user ON user_relationship.relating_username = friend_user.username
WHERE (user_relationship.origin_username = $1 OR user_relationship.relating_username = $1)`,
    [username],
  );
  return rows;
};

exports.modelPostFriendByUsername = async (username, relating_username) => {
  const { rows } = await db.query(
    `INSERT INTO user_relationship (origin_username, relating_username, friend_status) VALUES ($1, $2, 'pending') RETURNING *`,
    [username, relating_username],
  );
  return rows;
};

exports.modelPatchFriendByUsername = async (user_relationship_id) => {
  const { rows } = await db.query(
    `UPDATE user_relationship SET friend_status = 'accepted' WHERE user_relationship_id = $1 RETURNING *`,
    [user_relationship_id],
  );
  return rows;
};

exports.modelGetWishListByUsername = async (username) => {
  const { rows } = await db.query(
    `SELECT wishlist.isbn, wishlist.username, books.title, books.authors, books.publisher, books.published_date, books.description, books.imagelinks from wishlist JOIN books ON wishlist.isbn = books.isbn WHERE username = $1`,
    [username],
  );
  return rows;
};

exports.modelPostLoanByUserBookId = async (users_book_id, borrower_id) => {
  const { rows } = await db.query(
    `INSERT INTO loans (users_book_id, borrower_id, due_date)
      VALUES($1, $2, CURRENT_DATE + 21)
      RETURNING *`,
    [users_book_id, borrower_id],
  );
  return rows;
};
exports.modelDeleteBookByisbn = async (username, isbn) => {
  const query = await db.query(
    `DELETE FROM users_books WHERE isbn = $1 AND username = $2`,
    [isbn, username],
  );
  return query;
};

exports.modelUpdateLoanedBookByLoanId = async (loan_id, return_date) => {
  const { rows } = await db.query(
    `UPDATE loans
     SET return_date = $2
     WHERE loan_id = $1
     RETURNING *`,
    [loan_id, return_date],
  );
  return rows[0];
};

exports.modelDeleteFriendByUserRelatId = async (user_relationship_id) => {
  const { rows } = await db.query(
    `DELETE FROM user_relationship WHERE user_relationship_id = $1`,
    [user_relationship_id],
  );
  return;
};
