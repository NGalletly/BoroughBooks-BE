const express = require("express");
const booksRouter = express.Router({ mergeParams: true });
const { controllerGetBooks } = require("../controller/books.controller");

booksRouter.get("/", controllerGetBooks);

module.exports = booksRouter;
