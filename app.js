const express = require("express");
const app = express();
const cors = require("cors");

const usersbooksRouter = require("./routes/usersRouter");
const booksRouter = require("./routes/booksRouter");

app.use(express.json());
app.use(cors());

app.use("/api/users", usersbooksRouter);
app.use("/api/books", booksRouter);
app.use("/api", express.static("public"));

module.exports = app;
