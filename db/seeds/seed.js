const db = require("../connection");
const format = require("pg-format");

const seed = async function ({
  usersData,
  booksData,
  usersBooksData,
  loansData,
  wishlistData,
  friendsData,
}) {
  const formatUsers = usersData.map((user) => {
    return [user.username, user.profile_pic_url];
  });

  const formatBooks = booksData.map((book) => {
    return [
      book.isbn,
      book.title,
      book.authors,
      book.publisher,
      book.published_date,
      book.description,
      book.imagelinks.thumbnail,
    ];
  });

  const formatUsersBooks = usersBooksData.map((usersbook) => {
    return [usersbook.isbn, usersbook.username];
  });

  const formatLoans = loansData.map((loan) => {
    return [
      loan.user_book_id,
      loan.borrower_id,
      loan.borrow_date,
      loan.due_date,
      loan.return_date,
    ];
  });

  const formatWishlist = wishlistData.map((item) => {
    return [item.username, item.isbn];
  });

  const formatFriends = friendsData.map((person) => {
    return [
      person.origin_user_id,
      person.relating_user_id,
      person.friend_status,
    ];
  });

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
    title VARCHAR(200),
    authors VARCHAR(100),
    publisher VARCHAR(40),
    published_date DATE,
    description VARCHAR(1000),
    imagelinks VARCHAR(1000)

    )`);

  await db.query(`CREATE TABLE users_books(
    users_book_id SERIAL PRIMARY KEY,
    isbn VARCHAR(20) REFERENCES books(isbn),
    username VARCHAR(100) REFERENCES users(username)
    )`);

  await db.query(`CREATE TABLE loans(
    loan_id SERIAL PRIMARY KEY,
    users_book_id INT REFERENCES users_books(users_book_id) ON DELETE CASCADE,
    borrower_id VARCHAR(100) REFERENCES users(username),
    borrow_date DATE DEFAULT CURRENT_DATE,
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
      friend_status VARCHAR(100)
      )`);

  await db.query(
    format(
      `INSERT INTO users (username, profile_pic_url) VALUES %L`,
      formatUsers,
    ),
  );

  await db.query(
    format(
      `INSERT INTO books (isbn,title,authors,publisher,published_date,description,imagelinks) VALUES %L`,
      formatBooks,
    ),
  );

  await db.query(
    format(
      `INSERT INTO users_books(
    isbn, username) VALUES %L`,
      formatUsersBooks,
    ),
  );

  await db.query(
    format(
      `INSERT INTO loans( 
      users_book_id, 
    borrower_id,
    borrow_date,
    due_date ,
    return_date) VALUES %L`,
      formatLoans,
    ),
  );

  await db.query(
    format(
      `INSERT INTO wishlist(
   username,isbn) VALUES %L`,
      formatWishlist,
    ),
  );
  await db.query(
    format(
      `INSERT INTO user_relationship(
   origin_username,
      relating_username,
      friend_status
      ) VALUES %L`,
      formatFriends,
    ),
  );
};
module.exports = seed;
