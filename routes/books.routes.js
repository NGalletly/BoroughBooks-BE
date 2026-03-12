const express = require("express");
const booksRouter = express.Router({ mergeParams: true });
const {
  controllerGetBooks,
  controllerPostBook,
} = require("../controller/books.controller");

booksRouter.get("/", controllerGetBooks);

// POST
booksRouter.post("/", controllerPostBook);

module.exports = booksRouter;
