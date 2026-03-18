const express = require("express");
const conversationsRouter = express.Router({ mergeParams: true });
const {
  controllerGetConversations,
  controllerPostConversation,
} = require("../controller/conversations.controller");

conversationsRouter.get("/", controllerGetConversations);
conversationsRouter.post("/", controllerPostConversation);

module.exports = conversationsRouter;
