const db = require("../db/connection");

exports.modelGetUsers = async () => {
  const { rows } = await db.query(`SELECT * FROM users`);
  return rows;
};

exports.modelGetBorrowedBooksByUsername = async (username) => {
  const { rows } = await db.query(
    `SELECT books.* 
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
    `SELECT books.* 
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
