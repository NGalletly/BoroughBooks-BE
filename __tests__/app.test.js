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
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(Object.keys(res.body).length).toBe(1);
    expect(res.body).toHaveProperty("usersFriends");
    expect(Array.isArray(res.body.usersFriends)).toBe(true);
  });
  test("GET:200 - **rename** returns an object with the correct column", async () => {
    const res = await request(app).get("/api/users/jovaScript/friends");
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    for (const friend of res.body.usersFriends) {
      expect(friend).toHaveProperty("relating_username");
    }
  });
  test("GET:200 - returns an object that contains columns for the relating username and the profile pic url", async () => {
    const res = await request(app).get("/api/users/jovaScript/friends");
    expect(res.statusCode).toBe(200);
    for (const friend of res.body.usersFriends) {
      expect(friend).toHaveProperty("profile_pic_url");
    }
  });
  test("GET:200 - returns only records where the origin_username is jovaScript (parametric endpoint test)", async () => {
    const res = await request(app).get("/api/users/jovaScript/friends");
    expect(res.statusCode).toBe(200);
    console.log(res.body);
    for (const friend of res.body.usersFriends) {
      expect(friend.origin_username).toBe("jovaScript");
    }
  });
  test("GET:200 - returns records where friend_status on the user_relationships is accepted", async () => {
    const res = await request(app).get("/api/users/jovaScript/friends");
    expect(res.statusCode).toBe(200);
    console.log(res.body);
    for (const friend of res.body.usersFriends) {
      expect(friend.friend_status).toBe("accepted");
    }
  });
});

describe("/users/:username", () => {
  test("GET:200 - uses :username=coolSurferDudeto return an object that contains columns username and profile_pic_url", async () => {
    const res = await request(app).get("/api/users/coolSurferDude");
    console.log(res.body);
    for (const friend of res.body.user) {
      expect(friend).toHaveProperty("username");
      expect(friend).toHaveProperty("profile_pic_url");
    }
  });
});
