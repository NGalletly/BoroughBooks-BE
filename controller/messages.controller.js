const { servicePostMessage } = require("../service/messages.service");

exports.controllerPostMessage = async (request, response, next) => {
  try {
    const postMessage = request.body;
    const message = await servicePostMessage(postMessage);
    response.status(201).send({ message });
  } catch (err) {
    next(err);
  }
};
