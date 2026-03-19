const express = require("express");
const app = express();
const cors = require("cors");

const usersbooksRouter = require("./routes/usersRouter");
const booksRouter = require("./routes/books.routes");
const conversationsRouter = require("./routes/conversations.routes");
const messagesRouter = require("./routes/messages.routes");

app.use(express.json());
app.use(cors());

app.use("/api/users", usersbooksRouter);
app.use("/api/books", booksRouter);
app.use("/api/conversations", conversationsRouter);
app.use("/api/messages", messagesRouter);

app.use((req, res) => {
  res.status(404).send({ msg: "Path not found" });
});

app.use((err, req, res, next) => {
  console.log("ERROR:", err);

  if (err.status === 400) {
    res.status(400).send({ msg: err.msg });
  } else if (err.status === 404) {
    res.status(404).send({ msg: err.msg });
  } else if (err.status === 409) {
    res.status(409).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "Internal server error" });
  }
});

module.exports = app;
