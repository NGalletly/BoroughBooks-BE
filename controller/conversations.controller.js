const {
  serviceGetConversations,
  servicePostConversation,
} = require("../service/conversations.service");

exports.controllerGetConversations = async (request, response, next) => {
  try {
    const conversations = await serviceGetConversations();
    response.status(200).send({ conversations });
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
