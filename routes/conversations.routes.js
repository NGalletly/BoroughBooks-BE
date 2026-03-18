const express = require("express");
const conversationsRouter = express.Router({ mergeParams: true });
const {
  controllerGetConversations,
  controllerPostConversation,
  controllerGetConversationsByUsername,
} = require("../controller/conversations.controller");

conversationsRouter.get("/", controllerGetConversations);
conversationsRouter.get("/:username", controllerGetConversationsByUsername);
conversationsRouter.post("/", controllerPostConversation);

module.exports = conversationsRouter;
