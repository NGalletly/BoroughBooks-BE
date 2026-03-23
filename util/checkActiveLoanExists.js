const db = require("../db/connection");

exports.checkActiveLoanExists = async (users_book_id) => {
  const { rows } = await db.query(
    `SELECT * FROM loans WHERE users_book_id = $1 AND return_date IS NULL`,
    [users_book_id],
  );
  return rows.length === 1;
};
