const { modelPostMessage } = require("../model/messages.model");
const { modelGetConversationById } = require("../model/conversations.model");
const { modelGetUserByUsername } = require("../model/users.model");

exports.servicePostMessage = async (postMessage) => {
  const { conversation_id, sender_username, content } = postMessage;

  if (!conversation_id || !sender_username || !content) {
    return Promise.reject({
      status: 400,
      msg: "Missing required fields",
    });
  }

  if (isNaN(conversation_id)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid conversation id",
    });
  }

  const conversationRows = await modelGetConversationById(conversation_id);

  if (conversationRows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "Conversation doesn't exist",
    });
  }

  const userRows = await modelGetUserByUsername(sender_username);

  if (userRows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "User doesn't exist",
    });
  }

  const conversation = conversationRows[0];

  if (
    sender_username !== conversation.user1_username &&
    sender_username !== conversation.user2_username
  ) {
    return Promise.reject({
      status: 400,
      msg: "Sender is not part of this conversation",
    });
  }

  return await modelPostMessage(postMessage);
};
