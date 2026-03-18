const db = require("../db/connection");

exports.modelGetConversations = async () => {
  const { rows } = await db.query(`SELECT * FROM conversations`);
  return rows;
};

exports.modelPostConversation = async (postConversation) => {
  const { user1_username, user2_username } = postConversation;
  const { rows } = await db.query(
    `INSERT INTO conversations(
    user1_username,
    user2_username
  ) VALUES ($1, $2 ) RETURNING *`,
    [user1_username, user2_username],
  );
  return rows[0];
};
