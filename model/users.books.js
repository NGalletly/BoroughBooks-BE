const db = require("../db/connection");

exports.modelGetBooks = async () => {
  const { rows } = await db.query(`SELECT * FROM books`);
  return rows;
};
