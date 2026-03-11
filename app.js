const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const hello = "Hello World";

app.use("/api", express.static("public"));
app.use("/api/user-books", userBooksRouter);

module.exports = app;
