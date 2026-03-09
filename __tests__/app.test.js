const request = require("supertest");
const app = require("../app"); // Point to your app.js
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => seed(data));

afterAll(() => db.end());

describe("200 status", () => {
  test("get a 200 status code from /api", () => {
    return request(app).get("/api/index.html").expect(200);
  });
});
