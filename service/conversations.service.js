const {
  modelGetConversations,
  modelPostConversation,
} = require("../model/conversations.model");

const { modelGetUserByUsername } = require("../model/users.model");

exports.serviceGetConversations = async () => {
  return await modelGetConversations();
};

exports.servicePostConversation = async (postConversation) => {
  const { user1_username, user2_username } = postConversation;

  if (!user1_username || !user2_username) {
    return Promise.reject({
      status: 400,
      msg: "Missing required fields",
    });
  }

  const rows1 = await modelGetUserByUsername(user1_username);
  const rows2 = await modelGetUserByUsername(user2_username);

  if (rows1.length === 0 || rows2.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "User doesn't exist",
    });
  }

  return await modelPostConversation(postConversation);
};
