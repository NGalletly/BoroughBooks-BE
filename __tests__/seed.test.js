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

describe("conversations table", () => {
  test("conversations table exists", () => {
    return db
      .query(
        `
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_name = 'conversations'
        );
      `,
      )
      .then(({ rows: [{ exists }] }) => {
        expect(exists).toBe(true);
      });
  });

  test("conversations table has conversation_id as primary key", () => {
    return db
      .query(
        `
        SELECT column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        WHERE tc.constraint_type = 'PRIMARY KEY'
        AND tc.table_name = 'conversations';
      `,
      )
      .then(({ rows: [{ column_name }] }) => {
        expect(column_name).toBe("conversation_id");
      });
  });

  test("conversations table has user1_username column", () => {
    return db
      .query(
        `
        SELECT *
        FROM information_schema.columns
        WHERE table_name = 'conversations'
        AND column_name = 'user1_username';
      `,
      )
      .then(({ rows: [column] }) => {
        expect(column.column_name).toBe("user1_username");
        expect(column.data_type).toBe("character varying");
      });
  });

  test("conversations table has user2_username column", () => {
    return db
      .query(
        `
        SELECT *
        FROM information_schema.columns
        WHERE table_name = 'conversations'
        AND column_name = 'user2_username';
      `,
      )
      .then(({ rows: [column] }) => {
        expect(column.column_name).toBe("user2_username");
        expect(column.data_type).toBe("character varying");
      });
  });
});

describe("messages table", () => {
  test("messages table exists", () => {
    return db
      .query(
        `
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_name = 'messages'
        );
      `,
      )
      .then(({ rows: [{ exists }] }) => {
        expect(exists).toBe(true);
      });
  });

  test("messages table has message_id as primary key", () => {
    return db
      .query(
        `
        SELECT column_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
        WHERE tc.constraint_type = 'PRIMARY KEY'
        AND tc.table_name = 'messages';
      `,
      )
      .then(({ rows: [{ column_name }] }) => {
        expect(column_name).toBe("message_id");
      });
  });

  test("messages table has content column as text", () => {
    return db
      .query(
        `
        SELECT *
        FROM information_schema.columns
        WHERE table_name = 'messages'
        AND column_name = 'content';
      `,
      )
      .then(({ rows: [column] }) => {
        expect(column.column_name).toBe("content");
        expect(column.data_type).toBe("text");
      });
  });

  test("messages table has sent_at column", () => {
    return db
      .query(
        `
        SELECT *
        FROM information_schema.columns
        WHERE table_name = 'messages'
        AND column_name = 'sent_at';
      `,
      )
      .then(({ rows: [column] }) => {
        expect(column.column_name).toBe("sent_at");
        expect(column.data_type).toBe("timestamp without time zone");
      });
  });

  test("messages table has read_at column", () => {
    return db
      .query(
        `
        SELECT *
        FROM information_schema.columns
        WHERE table_name = 'messages'
        AND column_name = 'read_at';
      `,
      )
      .then(({ rows: [column] }) => {
        expect(column.column_name).toBe("read_at");
        expect(column.data_type).toBe("timestamp without time zone");
      });
  });
});
