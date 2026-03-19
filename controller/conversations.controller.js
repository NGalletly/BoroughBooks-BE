const {
  serviceGetConversations,
  servicePostConversation,
  serviceGetMessagesByConversationId,
  serviceGetConversationsByUsername,
} = require("../service/conversations.service");

exports.controllerGetConversations = async (request, response, next) => {
  try {
    const conversations = await serviceGetConversations();
    response.status(200).send({ conversations });
  } catch (err) {
    next(err);
  }
};

exports.controllerGetConversationsByUsername = async (
  request,
  response,
  next,
) => {
  try {
    const { username } = request.params;
    const conversations = await serviceGetConversationsByUsername(username);
    response.status(200).send({ conversations });
  } catch (err) {
    next(err);
  }
};

exports.controllerGetMessagesByConversationId = async (
  request,
  response,
  next,
) => {
  try {
    const { conversation_id } = request.params;
    const messages = await serviceGetMessagesByConversationId(conversation_id);
    response.status(200).send({ messages });
  } catch (err) {
    next(err);
  }
};

exports.controllerPostConversation = async (request, response, next) => {
  try {
    const postConversation = request.body;
    const conversation = await servicePostConversation(postConversation);
    response.status(201).send({ conversation });
  } catch (err) {
    next(err);
  }
};
