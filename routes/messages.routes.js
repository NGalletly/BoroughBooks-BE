const messagesRouter = require("express").Router();

const { controllerPostMessage } = require("../controller/messages.controller");

messagesRouter.post("/", controllerPostMessage);

module.exports = messagesRouter;
