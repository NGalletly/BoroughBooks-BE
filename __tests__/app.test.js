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
    const expected = {
      loan_id: 10,
      users_book_id: 8,
      borrower_id: "coolSurferDude",
      return_date: null,
    };
    expect(res.body.newLoan[0].loan_id).toBe(10);
    expect(res.body.newLoan[0].users_book_id).toBe(8);
    expect(res.body.newLoan[0].borrower_id).toBe("coolSurferDude");
    expect(res.body.newLoan[0].return_date).toBe(null);
  });
  test("PATCH - 204 updates the loaned endpoint with a return date and responds with 204 no content", async () => {
    const res = await request(app)
      .patch("/api/users/gavinHousley/loaned")
      .send({
        loan_id: 1,
        return_date: "2026-03-16T23:00:00.000Z",
      });
    expect(res.statusCode).toBe(204);
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
  expect(res.body.msg).toContain("Missing required fields");
  expect(res.body.msg).toContain("ISBN must be at least 10 characters");
});
