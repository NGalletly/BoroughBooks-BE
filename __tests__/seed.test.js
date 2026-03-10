const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("seed", () => {
  describe("books table", () => {
    test("books table exists", () => {
      return db
        .query(
          `SELECT EXISTS (
        SELECT FROM 
            information_schema.tables 
        WHERE 
            table_name = 'books'
        );`,
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true);
        });
    });
  });
});

test("books table has isbn column as the primary key", () => {
  return db
    .query(
      `SELECT column_name
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
            WHERE tc.constraint_type = 'PRIMARY KEY'
            AND tc.table_name = 'books';`,
    )
    .then(({ rows: [{ column_name }] }) => {
      expect(column_name).toBe("isbn");
    });
});

test("books table has title column as varying character", () => {
  return db
    .query(
      `SELECT *
            FROM information_schema.columns
            WHERE table_name = 'books'
            AND column_name = 'title';`,
    )
    .then(({ rows: [column] }) => {
      expect(column.column_name).toBe("title");
      expect(column.data_type).toBe("character varying");
    });
});

test("books table has description column as varying character", () => {
  return db
    .query(
      `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'books'
            AND column_name = 'description';`,
    )
    .then(({ rows: [column] }) => {
      expect(column.column_name).toBe("description");
      expect(column.data_type).toBe("character varying");
    });
});

test("books table has imglinks column of varying character of max length 1000", () => {
  return db
    .query(
      `SELECT column_name, data_type, character_maximum_length
            FROM information_schema.columns
            WHERE table_name = 'books'
            AND column_name = 'imagelinks';`,
    )
    .then(({ rows: [column] }) => {
      expect(column.column_name).toBe("imagelinks");
      expect(column.data_type).toBe("character varying");
      expect(column.character_maximum_length).toBe(1000);
    });
});

test("books table has publisher column as varying character", () => {
  return db
    .query(
      `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'books'
            AND column_name = 'publisher';`,
    )
    .then(({ rows: [column] }) => {
      expect(column.column_name).toBe("publisher");
      expect(column.data_type).toBe("character varying");
    });
});

test("books table has published_date column as date", () => {
  return db
    .query(
      `SELECT column_name, data_type, column_default
            FROM information_schema.columns
            WHERE table_name = 'books'
            AND column_name = 'published_date';`,
    )
    .then(({ rows: [column] }) => {
      expect(column.column_name).toBe("published_date");
      expect(column.data_type).toBe("date");
    });
});
