const db = require("../connection");
const format = require("pg-format");

const seed = async function (data) {
  await db.query(`DROP TABLE IF EXISTS user_relationship`);
  await db.query(`DROP TABLE IF EXISTS wishlist`);
  await db.query(`DROP TABLE IF EXISTS loans`);
  await db.query(`DROP TABLE IF EXISTS users_books`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`DROP TABLE IF EXISTS books`);

  await db.query(`CREATE TABLE users(
    username VARCHAR(100) PRIMARY KEY,
    profile_pic_url VARCHAR(250)
    )`);

  await db.query(`CREATE TABLE books(
    isbn VARCHAR(20) PRIMARY KEY,
    title VARCHAR(100),
    authors VARCHAR(50),
    publisher VARCHAR(40),
    published_date DATE,
    description VARCHAR(500),
    imagelinks VARCHAR(250)

    )`);

  await db.query(`CREATE TABLE users_books(
    users_book_id SERIAL PRIMARY KEY,
    isbn VARCHAR(20) REFERENCES books(isbn),
    username VARCHAR(100) REFERENCES users(username)
    )`);

  await db.query(`CREATE TABLE loans(
    loan_id SERIAL PRIMARY KEY,
    users_book_id INT REFERENCES users_books(users_book_id),
    borrower_id VARCHAR(100) REFERENCES users(username),
    borrow_date DATE,
    due_date DATE,
    return_date DATE
    
    )`);

  await db.query(`CREATE TABLE wishlist(
      wish_list_id SERIAL PRIMARY KEY,
      username VARCHAR(100) REFERENCES users(username),
      isbn VARCHAR(20) REFERENCES books(isbn)
      )`);

  await db.query(`CREATE TABLE user_relationship(
      user_relationship_id SERIAL PRIMARY KEY,
      origin_username VARCHAR(100) REFERENCES users(username),
      relating_username VARCHAR(100) REFERENCES  users(username),
      friend_stats VARCHAR(100)
      )`);
};

module.exports = seed;
