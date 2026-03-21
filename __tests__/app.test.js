const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("test", () => {
  test("test", () => {
    expect(1).toBe(1);
  });
});

describe("/api/users/jovaScript/friends", () => {
  test("GET:200 - returns an object with a single key-value pair where the value is an array", async () => {
    const res = await request(app).get("/api/users/jovaScript/friends");
    expect(res.statusCode).toBe(200);
    expect(Object.keys(res.body).length).toBe(1);
    expect(res.body).toHaveProperty("usersFriends");
    expect(Array.isArray(res.body.usersFriends)).toBe(true);
  });
  test("GET:200 - **rename** returns an object with the correct column", async () => {
    const res = await request(app).get("/api/users/jovaScript/friends");
    expect(res.statusCode).toBe(200);
    for (const friend of res.body.usersFriends) {
      expect(friend).toHaveProperty("relating_username");
    }
  });
  test("GET:200 - returns an object that contains columns for the relating username and the profile pic url", async () => {
    const res = await request(app).get("/api/users/jovaScript/friends");
    expect(res.statusCode).toBe(200);
    for (const friend of res.body.usersFriends) {
      expect(friend).toHaveProperty("origin_profile_pic_url");
      expect(friend).toHaveProperty("friend_profile_pic_url");
    }
  });
  test("GET:200 - returns only records where the origin_username or relating_username is jovaScript (parametric endpoint test)", async () => {
    const res = await request(app).get("/api/users/jovaScript/friends");
    expect(res.statusCode).toBe(200);
    for (const friend of res.body.usersFriends) {
      expect(Object.values(friend)).toContain("jovaScript");
    }
  });
  test("DELETE:204 - deletes friend and returns no content and 204 status", async () => {
    const res = await request(app)
      .delete("/api/users/jovascript/friends")
      .send({
        user_relationship_id: 1,
      });
    expect(res.statusCode).toBe(204);
    expect(res.body).toEqual({});
  });
});
test("PATCH:202 - returns an object with a single key value pair where the length of the value array is 1", async () => {
  const res = await request(app)
    .patch("/api/users/jovaScript/friends")
    .send({ user_relationship_id: 6 });
  expect(res.statusCode).toBe(202);
  expect(Object.keys(res.body).length).toBe(1);
});
test("PATCH:202 - returns an object where the friend status has a value equal to 'accepted'", async () => {
  const res = await request(app)
    .patch("/api/users/jovaScript/friends")
    .send({ user_relationship_id: 6 });
  expect(res.statusCode).toBe(202);
  expect(res.body.usersAcceptedFriendRequest[0].friend_status).toBe("accepted");
});
test("PATCH:202 - returns an object where the origin_username and relating_username are the expected users", async () => {
  const res = await request(app)
    .patch("/api/users/jovaScript/friends")
    .send({ user_relationship_id: 6 });
  expect(res.statusCode).toBe(202);
  expect(res.body.usersAcceptedFriendRequest[0].origin_username).toBe(
    "coolSurferDude",
  );
  expect(res.body.usersAcceptedFriendRequest[0].relating_username).toBe(
    "jovaScript",
  );
});

describe("/api/users/:username/wish-list", () => {
  test("GET:200 - returns an object with a single key-value pair where the value is an array", async () => {
    const res = await request(app).get("/api/users/jovaScript/wish-list");
    expect(res.statusCode).toBe(200);
    expect(Object.keys(res.body).length).toBe(1);
    expect(res.body).toHaveProperty("usersWishList");
    expect(Array.isArray(res.body.usersWishList)).toBe(true);
  });
  test("GET:200 - returns only records where the username is jovaScript (parametric endpoint test)", async () => {
    const res = await request(app).get("/api/users/jovaScript/wish-list");
    expect(res.statusCode).toBe(200);
    for (const book of res.body.usersWishList) {
      expect(book.username).toBe("jovaScript");
    }
  });
  test("GET:200 - returns columns containing relevant book information", async () => {
    const res = await request(app).get("/api/users/jovaScript/wish-list");
    expect(res.statusCode).toBe(200);
    for (const book of res.body.usersWishList) {
    }
  });

  test("GET:200 - returns the expected number of wish listed books for a particular user", async () => {
    const res = await request(app).get("/api/users/jovaScript/wish-list");
    expect(res.statusCode).toBe(200);
    expect(res.body.usersWishList.length).toBe(3);
  });
});
describe("/api/users/:username/wish-list/:isbn", () => {
  test("DELETE:204 - returns the expected status code", async () => {
    const res = await request(app).delete(
      "/api/users/:username/wish-list/:isbn",
    );
    expect(res.statusCode).toBe(204);
  });
});
describe("/api/users/:username/my-library/:isbn", () => {
  test("GET:200 - returns an object with a single property where the length of the value array is 1", async () => {
    const res = await request(app).get(
      "/api/users/jovaScript/my-library/9780679723394",
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.usersBookByIsbn.length).toBe(1);
  });
  test("GET:200 - returns a property with a username and isbn key", async () => {
    const res = await request(app).get(
      "/api/users/jovaScript/my-library/9780679723394",
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.usersBookByIsbn[0]).toHaveProperty("isbn");
    expect(res.body.usersBookByIsbn[0]).toHaveProperty("username");
  });
  test("GET:200 - returns a property with a username and isbn key with the correct values from the endpoint", async () => {
    const res = await request(app).get(
      "/api/users/jovaScript/my-library/9780679723394",
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.usersBookByIsbn[0].isbn).toBe("9780679723394");
    expect(res.body.usersBookByIsbn[0].username).toBe("jovaScript");
  });
  test("GET:200 - returns an object containing the expected columns from the books table for the user's book", async () => {
    const res = await request(app).get(
      "/api/users/jovaScript/my-library/9780679723394",
    );
    expect(res.body.usersBookByIsbn[0]).toHaveProperty("title");
    expect(res.body.usersBookByIsbn[0]).toHaveProperty("authors");
    expect(res.body.usersBookByIsbn[0]).toHaveProperty("publisher");
    expect(res.body.usersBookByIsbn[0]).toHaveProperty("published_date");
    expect(res.body.usersBookByIsbn[0]).toHaveProperty("description");
    expect(res.body.usersBookByIsbn[0]).toHaveProperty("imagelinks");
  });
  test("GET:200 - returns an object containing the associated users_book_id", async () => {
    const res = await request(app).get(
      "/api/users/jovaScript/my-library/9780679723394",
    );
    expect(res.body.usersBookByIsbn[0]).toHaveProperty("users_book_id");
  });
  test("GET:200 - returns an object containing the associated users_book_id", async () => {
    const res = await request(app).get(
      "/api/users/jovaScript/my-library/9780679723394",
    );
    expect(res.body.usersBookByIsbn[0].users_book_id).toBe(1);
  });
});

test("GET:200 - returns an array of book objects which have the correct keys", async () => {
  const res = await request(app).get("/api/books");
  res.body.books.forEach((book) => {
    expect(book).toHaveProperty("isbn");
    expect(book).toHaveProperty("title");
    expect(book).toHaveProperty("authors");
    expect(book).toHaveProperty("publisher");
    expect(book).toHaveProperty("published_date");
    expect(book).toHaveProperty("description");
    expect(book).toHaveProperty("imagelinks");
  });
});
test("GET:200 - returns book objects which contain the correct data types", async () => {
  const res = await request(app).get("/api/books");
  const bookOne = res.body.books[0];
  expect(typeof bookOne.isbn).toBe("string");
  expect(typeof bookOne.title).toBe("string");
});

describe("GET /api/books/:isbn", () => {
  test("GET:200 - returns a single key-value pair object where the value is an array of length 1", async () => {
    const res = await request(app).get("/api/books/9780140154511");
    expect(Object.keys(res.body).length).toBe(1);
    expect(res.body.book.length).toBe(1);
  });
  test("GET:200 - returns the correct keys for the book object", async () => {
    const res = await request(app).get("/api/books/9780140154511");
    expect(res.body.book[0].isbn).toBeString;
    expect(res.body.book[0].title).toBeString;
    expect(res.body.book[0].authors).toBeString;
    expect(res.body.book[0].publisher).toBeString;
    expect(res.body.book[0].published_date).toBeString;
    expect(res.body.book[0].description).toBeString;
    expect(res.body.book[0].imagelinks).toBeString;
  });
  test("GET:200 - returns the correct keys for the book object", async () => {
    const res = await request(app).get("/api/books/9780140154511");
    expect(res.body.book[0].isbn).toBe("9780140154511");
    expect(res.body.book[0].title).toBe("The Earthsea Quartet");
    expect(res.body.book[0].authors).toBe("Ursula K. Le Guin");
    expect(res.body.book[0].publisher).toBe("Penguin Books");
    expect(res.body.book[0].published_date).toBe("1993-01-01T00:00:00.000Z");
    expect(res.body.book[0].description).toBe(
      "Collects the first four books of Le Guin's landmark fantasy series: A Wizard of Earthsea, The Tombs of Atuan, The Farthest Shore, and Tehanu — following the wizard Ged across a vast archipelago world.",
    );
    expect(res.body.book[0].imagelinks).toBe(
      "https://books.google.com/books/content?vid=ISBN9780140154511&printsec=frontcover&img=1&zoom=1",
    );
  });
});

describe("/api/users/loaned - Loans feature testing", () => {
  test("POST 201-Returns an object with the corrected key value pairs", async () => {
    const res = await request(app).post("/api/users/gavinHousley/loaned").send({
      users_book_id: 8,
      borrower_id: "coolSurferDude",
    });
    expect(res.body.newLoan[0]).toHaveProperty("loan_id");
    expect(res.body.newLoan[0]).toHaveProperty("users_book_id");
    expect(res.body.newLoan[0]).toHaveProperty("borrower_id");
    expect(res.body.newLoan[0]).toHaveProperty("borrow_date");
    expect(res.body.newLoan[0]).toHaveProperty("due_date");
    expect(res.body.newLoan[0]).toHaveProperty("return_date");
  });
  test("POST - 201-loans feature returns completed DB line when passed users_book_id and borrower_id", async () => {
    const res = await request(app).post("/api/users/gavinHousley/loaned").send({
      users_book_id: 8,
      borrower_id: "coolSurferDude",
    });
    expect(res.status).toBe(201);

    expect(res.body.newLoan[0]).toMatchObject({
      loan_id: 10,
      users_book_id: 8,
      borrower_id: "coolSurferDude",
      return_date: null,
    });
    expect(res.body.newLoan[0]).toHaveProperty("borrow_date");
    expect(res.body.newLoan[0]).toHaveProperty("due_date");
  });
  test("PATCH - 204 updates the loaned endpoint with a return date and responds with 204 no content", async () => {
    const postRes = await request(app)
      .post("/api/users/gavinHousley/loaned")
      .send({
        users_book_id: 8,
        borrower_id: "coolSurferDude",
      });

    const loanId = postRes.body.newLoan[0].loan_id;

    const patchRes = await request(app)
      .patch("/api/users/gavinHousley/loaned")
      .send({
        loan_id: loanId,
        return_date: "2026-03-16T23:00:00.000Z",
      });

    expect(patchRes.statusCode).toBe(204);
  });
  test("PATCH - 400 - returns with an error when not enough content submitted for a loan", async () => {
    const res = await request(app)
      .patch("/api/users/gavinHousley/loaned")
      .send({
        loan_id: 1,
        return_date: "",
      });
    expect(res.statusCode).toBe(400);
  });
  test("PATCH - 404 - loan_id does not exist in the database", async () => {
    const res = await request(app)
      .patch("/api/users/gavinHousley/loaned")
      .send({
        loan_id: 55,
        return_date: "2026-03-16T23:00:00.000Z",
      });
    expect(res.statusCode).toBe(404);
  });
});

describe("Invalid Endpoint", () => {
  test("404: responds with a message when given an invalid path", async () => {
    const res = await request(app).get("/api/bananas");
    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe("Path not found");
  });
});

describe("GET /api/users/:username/borrowed", () => {
  test("200: returns an array of loaned books for a valid user", async () => {
    const res = await request(app).get("/api/users/coolSurferDude/borrowed");
    console.log("Status:", res.status);
    console.log("Response body:", JSON.stringify(res.body, null, 2));
    expect(res.status).toBe(200);
    expect(res.body.books).toBeInstanceOf(Array);
    expect(res.body.books.length).toBeGreaterThan(0);
  });
});

describe("GET /api/users/:username/loaned", () => {
  test("200: returns an array of loaned books for a valid user", async () => {
    const res = await request(app).get("/api/users/jovaScript/loaned");
    console.log("Status:", res.status);
    console.log("Response body:", JSON.stringify(res.body, null, 2));
    expect(res.status).toBe(200);
    expect(res.body.books).toBeInstanceOf(Array);
    expect(res.body.books.length).toBeGreaterThan(0);
  });
});

describe("POST /api/users/:username/my-library", () => {
  test("POST:201: returns an object with the correct columns from the users_books table", async () => {
    const res = await request(app)
      .post("/api/users/jovaScript/my-library")
      .send({
        isbn: "9780140154511",
      });
    expect(res.status).toBe(201);
    expect(res.body.users_book_id).toBeNumber;
    expect(res.body.username).toBeString;
    expect(res.body.isbn).toBeString;
  });
  test("POST:201: returns an object with the correct information sent with the post body and parametric endpoint", async () => {
    const res = await request(app)
      .post("/api/users/jovaScript/my-library")
      .send({
        isbn: "9780140154511",
      });
    expect(res.status).toBe(201);
    expect(res.body.postedBookToLibrary[0].username).toBe("jovaScript");
    expect(res.body.postedBookToLibrary[0].isbn).toBe("9780140154511");
  });
});

describe("POST /api/users/:username/friends", () => {
  test("POST 201: returns an object with a single key-value pair", async () => {
    const res = await request(app)
      .post("/api/users/jovaScript/friends")
      .send({ relating_username: "gavinHousley" });
    expect(res.status).toBe(201);
    expect(Object.keys(res.body).length).toBe(1);
  });
  test("POST 201: returns an object with the expected columns in the value array", async () => {
    const res = await request(app)
      .post("/api/users/jovaScript/friends")
      .send({ relating_username: "gavinHousley" });
    expect(res.status).toBe(201);
    expect(res.body.usersNewFriendRequest.user_relationship_id).toBeNumber;
    expect(res.body.usersNewFriendRequest.origin_username).toBeString;
    expect(res.body.usersNewFriendRequest.relating_username).toBeString;
    expect(res.body.usersNewFriendRequest.friend_status).toBeString;
  });
  test("POST 201: returns an object with the correct posted data in the value array", async () => {
    const res = await request(app)
      .post("/api/users/groovySkaterGirl/friends")
      .send({ relating_username: "coolSurferDude" });
    expect(res.status).toBe(201);
    expect(res.body.usersNewFriendRequest[0].origin_username).toBe(
      "groovySkaterGirl",
    );
    expect(res.body.usersNewFriendRequest[0].relating_username).toBe(
      "coolSurferDude",
    );
    expect(res.body.usersNewFriendRequest[0].friend_status).toBe("pending");
  });
});

// POST BOOKS TESTING

describe("POST /api/books", () => {
  test("201: adds a new book and returns the newly added book", async () => {
    const newBook = {
      isbn: "9780062316097",
      title: "Sapiens: A Brief History of Humankind",
      authors: "Yuval Noah Harari",
      publisher: "Harper Perennial",
      published_date: "2015-02-10",
      description:
        "A sweeping narrative of humanitys creation and evolution, exploring how biology and history have defined us.",
      imagelinks:
        "https://books.google.com/books/content?vid=ISBN9780062316097&printsec=frontcover&img=1&zoom=1",
    };

    const res = await request(app).post("/api/books").send(newBook);

    expect(res.status).toBe(201);
    expect(res.body.newBook).toMatchObject({
      isbn: "9780062316097",
      title: "Sapiens: A Brief History of Humankind",
      authors: "Yuval Noah Harari",
      publisher: "Harper Perennial",
      description: expect.any(String),
      imagelinks: expect.any(String),
    });
  });

  test("409: returns error when book already exists", async () => {
    const existingBook = {
      isbn: "9780062316097",
      title: "Sapiens: A Brief History of Humankind",
      authors: "Yuval Noah Harari",
      publisher: "Harper Perennial",
      published_date: "2015-02-10",
      description: "A sweeping narrative of humanitys creation and evolution.",
      imagelinks:
        "https://books.google.com/books/content?vid=ISBN9780062316097&printsec=frontcover&img=1&zoom=1",
    };

    await request(app).post("/api/books").send(existingBook);

    const res = await request(app).post("/api/books").send(existingBook);

    expect(res.status).toBe(409);
    expect(res.body.msg).toBe("Book already exists.");
  });
});

test("400: returns error when required fields are missing", async () => {
  const invalidBook = {
    isbn: "123",
    title: "The Incomplete Book",
  };

  const res = await request(app).post("/api/books").send(invalidBook);

  expect(res.status).toBe(400);
});

// POST/GET CONVERSATIONS TESTING

describe("POST /api/conversations", () => {
  test("201: adds a new conversation and returns the new conversation", async () => {
    const newConversation = {
      user1_username: "nomi",
      user2_username: "coolSurferDude",
    };

    const res = await request(app)
      .post("/api/conversations")
      .send(newConversation);

    expect(res.status).toBe(201);

    expect(res.body.conversation).toMatchObject({
      user1_username: "nomi",
      user2_username: "coolSurferDude",
    });

    expect(res.body.conversation).toHaveProperty("conversation_id");
    expect(res.body.conversation).toHaveProperty("created_at");
  });

  test("404: returns error when one user does not exist", async () => {
    const newConversation = {
      user1_username: "not_a_user",
      user2_username: "jovaScript",
    };

    const res = await request(app)
      .post("/api/conversations")
      .send(newConversation);

    expect(res.status).toBe(404);
    expect(res.body.msg).toBeDefined();
  });

  test("400: returns error when required fields are missing", async () => {
    const res = await request(app)
      .post("/api/conversations")
      .send({ user1_username: "nomi" });

    expect(res.status).toBe(400);
    expect(res.body.msg).toBeDefined();
  });

  test("400: returns error when request body is empty", async () => {
    const res = await request(app).post("/api/conversations").send({});

    expect(res.status).toBe(400);
    expect(res.body.msg).toBeDefined();
  });
});

describe("GET /api/conversations", () => {
  test("200: returns an empty array when no conversations exist", async () => {
    const res = await request(app).get("/api/conversations");

    expect(res.status).toBe(200);
    expect(res.body.conversations).toEqual([]);
  });

  test("200: returns all conversations after creating one", async () => {
    await request(app).post("/api/conversations").send({
      user1_username: "nomi",
      user2_username: "jovaScript",
    });

    const res = await request(app).get("/api/conversations");

    expect(res.status).toBe(200);
    expect(res.body.conversations.length).toBe(1);

    expect(res.body.conversations[0]).toMatchObject({
      user1_username: "nomi",
      user2_username: "jovaScript",
    });

    expect(res.body.conversations[0]).toHaveProperty("conversation_id");
    expect(res.body.conversations[0]).toHaveProperty("created_at");
  });

  test("200: returns multiple conversations", async () => {
    await request(app).post("/api/conversations").send({
      user1_username: "nomi",
      user2_username: "jovaScript",
    });

    await request(app).post("/api/conversations").send({
      user1_username: "nomi",
      user2_username: "coolSurferDude",
    });

    const res = await request(app).get("/api/conversations");

    expect(res.status).toBe(200);
    expect(res.body.conversations.length).toBe(2);
  });
});

// GET conversation by username

describe("GET /api/conversations/:username", () => {
  test("200: returns all conversations for a given user", async () => {
    await request(app).post("/api/conversations").send({
      user1_username: "nomi",
      user2_username: "jovaScript",
    });

    await request(app).post("/api/conversations").send({
      user1_username: "nomi",
      user2_username: "coolSurferDude",
    });

    await request(app).post("/api/conversations").send({
      user1_username: "gavinHousley",
      user2_username: "jovaScript",
    });

    const res = await request(app).get("/api/conversations/nomi");

    expect(res.status).toBe(200);
    expect(res.body.conversations).toHaveLength(2);

    res.body.conversations.forEach((conversation) => {
      expect(
        conversation.user1_username === "nomi" ||
          conversation.user2_username === "nomi",
      ).toBe(true);
    });
  });

  test("200: returns an empty array when user has no conversations", async () => {
    const res = await request(app).get("/api/conversations/groovySkaterGirl");

    expect(res.status).toBe(200);
    expect(res.body.conversations).toEqual([]);
  });

  test("404: returns error when username does not exist", async () => {
    const res = await request(app).get("/api/conversations/not_a_user");

    expect(res.status).toBe(404);
    expect(res.body.msg).toBeDefined();
  });
});

// GET messages by conversation ID

describe("GET /api/conversations/:conversation_id/messages", () => {
  test("200: returns an empty array when the conversation has no messages", async () => {
    const convoRes = await request(app).post("/api/conversations").send({
      user1_username: "nomi",
      user2_username: "jovaScript",
    });

    const conversationId = convoRes.body.conversation.conversation_id;

    const res = await request(app).get(
      `/api/conversations/${conversationId}/messages`,
    );

    expect(res.status).toBe(200);
    expect(res.body.messages).toEqual([]);
  });

  test("200: returns all messages for a conversation", async () => {
    const convoRes = await request(app).post("/api/conversations").send({
      user1_username: "nomi",
      user2_username: "jovaScript",
    });

    const conversationId = convoRes.body.conversation.conversation_id;

    await db.query(
      `INSERT INTO messages (conversation_id, sender_username, content)
       VALUES ($1, $2, $3), ($1, $4, $5)`,
      [conversationId, "nomi", "hey", "jovaScript", "hi there"],
    );

    const res = await request(app).get(
      `/api/conversations/${conversationId}/messages`,
    );

    expect(res.status).toBe(200);
    expect(res.body.messages).toHaveLength(2);
    expect(res.body.messages[0]).toHaveProperty("message_id");
    expect(res.body.messages[0]).toHaveProperty("conversation_id");
    expect(res.body.messages[0]).toHaveProperty("sender_username");
    expect(res.body.messages[0]).toHaveProperty("content");
    expect(res.body.messages[0]).toHaveProperty("sent_at");
    expect(res.body.messages[0]).toHaveProperty("read_at");
  });

  test("200: only returns messages for the requested conversation", async () => {
    const convo1 = await request(app).post("/api/conversations").send({
      user1_username: "nomi",
      user2_username: "jovaScript",
    });

    const convo2 = await request(app).post("/api/conversations").send({
      user1_username: "nomi",
      user2_username: "coolSurferDude",
    });

    const id1 = convo1.body.conversation.conversation_id;
    const id2 = convo2.body.conversation.conversation_id;

    await db.query(
      `INSERT INTO messages (conversation_id, sender_username, content)
       VALUES
         ($1, 'nomi', 'message in convo 1'),
         ($2, 'nomi', 'message in convo 2')`,
      [id1, id2],
    );

    const res = await request(app).get(`/api/conversations/${id1}/messages`);

    expect(res.status).toBe(200);
    expect(res.body.messages).toHaveLength(1);
    expect(res.body.messages[0].content).toBe("message in convo 1");
    expect(res.body.messages[0].conversation_id).toBe(id1);
  });

  test("404: returns an error when conversation does not exist", async () => {
    const res = await request(app).get("/api/conversations/9999/messages");

    expect(res.status).toBe(404);
    expect(res.body.msg).toBeDefined();
  });

  test("400: returns an error when conversation_id is invalid", async () => {
    const res = await request(app).get(
      "/api/conversations/not-a-number/messages",
    );

    expect(res.status).toBe(400);
    expect(res.body.msg).toBeDefined();
  });
});

// POST messages
describe("POST /api/messages", () => {
  test("201: adds a new message and returns the new message", async () => {
    const convoRes = await request(app).post("/api/conversations").send({
      user1_username: "nomi",
      user2_username: "jovaScript",
    });

    const conversationId = convoRes.body.conversation.conversation_id;

    const newMessage = {
      conversation_id: conversationId,
      sender_username: "nomi",
      content: "Hey, how are you?",
    };

    const res = await request(app).post("/api/messages").send(newMessage);

    expect(res.status).toBe(201);
    expect(res.body.message).toMatchObject({
      conversation_id: conversationId,
      sender_username: "nomi",
      content: "Hey, how are you?",
      read_at: null,
    });
    expect(res.body.message).toHaveProperty("message_id");
    expect(res.body.message).toHaveProperty("sent_at");
  });
  test("400: returns an error when required fields are missing", async () => {
    const res = await request(app).post("/api/messages").send({
      sender_username: "nomi",
      content: "Hello",
    });

    expect(res.status).toBe(400);
    expect(res.body.msg).toBeDefined();
  });
  test("404: returns an error when conversation does not exist", async () => {
    const res = await request(app).post("/api/messages").send({
      conversation_id: 9999,
      sender_username: "nomi",
      content: "Hello",
    });

    expect(res.status).toBe(404);
    expect(res.body.msg).toBeDefined();
  });
  test("404: returns an error when sender does not exist", async () => {
    const convoRes = await request(app).post("/api/conversations").send({
      user1_username: "nomi",
      user2_username: "jovaScript",
    });

    const conversationId = convoRes.body.conversation.conversation_id;

    const res = await request(app).post("/api/messages").send({
      conversation_id: conversationId,
      sender_username: "not_a_user",
      content: "Hello",
    });

    expect(res.status).toBe(404);
    expect(res.body.msg).toBeDefined();
  });
});

describe("DELETE /api/users/:username/loaned/:users_book_id", () => {
  test("DELETE:204 - deletes a loan and returns no content", async () => {
    const res = await request(app)
      .delete("/api/users/groovySkaterGirl/loaned/18")
      .expect(204);

    expect(res.body).toEqual({});
  });

  test("DELETE:204 - verifies the loan was actually deleted by checking the loaned books list", async () => {
    // First delete the loan
    await request(app)
      .delete("/api/users/groovySkaterGirl/loaned/18")
      .expect(204);

    // Then verify it's gone by fetching loaned books
    const checkRes = await request(app).get(
      "/api/users/groovySkaterGirl/loaned",
    );

    expect(checkRes.status).toBe(200);

    // Should not find a book with users_book_id of 18
    const deletedLoan = checkRes.body.books.find(
      (book) => book.users_book_id === 18,
    );

    expect(deletedLoan).toBeUndefined();
  });

  test("DELETE:404 - returns error when users_book_id does not exist", async () => {
    const res = await request(app).delete(
      "/api/users/groovySkaterGirl/loaned/99999",
    );

    expect(res.status).toBe(404);
    expect(res.body.msg).toBe("Loan no found, yikes!");
  });
});
