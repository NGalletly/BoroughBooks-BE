const express = require("express");
const booksRouter = express.Router({ mergeParams: true });
const {
  controllerGetBooks,
  controllerPostBook,
} = require("../controller/books.controller");
const { validateBookBody } = require("../util/validateBookBody");

booksRouter.get("/", controllerGetBooks);

// POST
booksRouter.post("/", validateBookBody, controllerPostBook);

module.exports = booksRouter;
