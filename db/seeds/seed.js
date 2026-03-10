const db = require("../connection");
const format = require("pg-format");

const seed = async function (data) {
  await db.query(`DROP TABLE IF EXISTS users_books`);
  await db.query(`DROP TABLE IF EXISTS users`);
  await db.query(`DROP TABLE IF EXISTS books`);
  // await db.query(`DROP TABLE IF EXISTS loans`);
  // await db.query(`DROP TABLE IF EXISTS wishlist`);

  await db.query(`CREATE TABLE users(
    username VARCHAR(100) PRIMARY KEY,
    profile_pic_url VARCHAR(250)
    )`);

  await db.query(`CREATE TABLE books(
    isbn INT PRIMARY KEY,
    title VARCHAR(100),
    authors VARCHAR(75)

    )`);

  await db.query(`CREATE TABLE users_books(
    users_books_id SERIAL PRIMARY KEY,
    isbn INT REFERENCES books(isbn),
    username VARCHAR(100) REFERENCES users(username)
    )`);
};

module.exports = seed;
