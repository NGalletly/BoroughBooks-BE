const db = require("../db/connection");

exports.modelGetConversations = async () => {
  const { rows } = await db.query(`SELECT * FROM conversations`);
  return rows;
};

exports.modelGetConversationsByUsername = async (username) => {
  const { rows } = await db.query(
    `SELECT * FROM conversations
     WHERE user1_username = $1
        OR user2_username = $1
     ORDER BY created_at DESC`,
    [username],
  );
  return rows;
};

exports.modelGetConversationById = async (conversation_id) => {
  const { rows } = await db.query(
    `SELECT * FROM conversations
     WHERE conversation_id = $1`,
    [conversation_id],
  );
  return rows;
};

exports.modelGetMessagesByConversationId = async (conversation_id) => {
  const { rows } = await db.query(
    `SELECT * FROM messages
     WHERE conversation_id = $1
     ORDER BY sent_at ASC`,
    [conversation_id],
  );
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
