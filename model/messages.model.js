const db = require("../db/connection");

exports.modelPostMessage = async (postMessage) => {
  const { conversation_id, sender_username, content } = postMessage;

  const { rows } = await db.query(
    `INSERT INTO messages (
      conversation_id,
      sender_username,
      content
    )
    VALUES ($1, $2, $3)
    RETURNING *`,
    [conversation_id, sender_username, content],
  );

  return rows[0];
};
