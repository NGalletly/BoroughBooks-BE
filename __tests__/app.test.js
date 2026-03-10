const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

// beforeEach(() => seed());

// afterAll(() => db.end());

describe("test", () => {
  test("test", () => {
    expect(1).toBe(1);
  });
});
