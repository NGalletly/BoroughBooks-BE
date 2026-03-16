const express = require("express");
const booksRouter = express.Router({ mergeParams: true });
const {
  controllerGetBooks,
  controllerGetBookByIsbn,
  controllerPostBook,
} = require("../controller/books.controller");
const { validateBookBody } = require("../util/validateBookBody");

booksRouter.get("/", controllerGetBooks);
booksRouter.get("/:isbn", controllerGetBookByIsbn);

// POST
booksRouter.post("/", validateBookBody, controllerPostBook);

module.exports = booksRouter;
