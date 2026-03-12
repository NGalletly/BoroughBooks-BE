# BoroughBooks-BE

Requirements

- Node v22.14.0

## Getting Started:

Please check `package.json` for dependencies and run

```
npm install
```

Dependencies Installed (manual commands if needed)<br/>
Node: npm install<br/>
Jest: npm install --save-dev jest<br/>
JestSorted: npm install --save-dev jest-sorted<br/>
Express: npm install express<br/>
Cors: npm install cors<br/>
SuperTest: npm install supertest --save-dev<br/>
Dotenv: npm install dotenv --save<br/>
Nodemon: npm install --save-dev nodemon<br/>
PostGres: npm install pg<br/>
PostGres Format: npm install pg-format<br/>

To start please create your own .env files in root directory:

- `.env.test`
- `.env.development`

In these files please connect to the connection.js by placing the following their respective .env.test and env.development files:

```
PGDATABASE=borough_books
PGDATABASE=borough_books_test
```

Once this is done please ensure you have the following in your .gitignore

```
node_modules/
.env.development
.env.test
.env.*
```

To check if this is working console.log the ENV variable in connection.js in jest test and in development environment to see it toggle from test to development.
const ENV = process.env.NODE_ENV || 'development'

### Creating Test and Development Databases:

To create Databases navigate to the db folder and run:

```
psql -f setup-dbs.sql
```

### Seeding the Database:

To seed the Database use the commands:

```
npm run test-seed
```

```
npm run seed-dev
```

## Local development

After creating databases and seeding please run

```
npm start
```

Note: Server will be running on [http://localhost:9000/api](http://localhost:9000/api)

## Display tables

To see scema and display tables in output.txt, write the following command in terminal. Note, ensure you npm run seed-dev before doing this.

psql borough*books -c "\dt" -c "SELECT * FROM users;" -c "SELECT _ FROM books;" -c "SELECT _ FROM users*books;" -c "SELECT * FROM loans;" -c "SELECT _ FROM wishlist;" -c "SELECT _ FROM user_relationship;" > output.txt && cat output.txt

## Production ( Supabase )

1. Request the `.env.production` connection string from a team member — **never commit this to GitHub**
2. Create a `.env.production` file in the root with:

```
DATABASE_URL=your_supabase_transaction_pooler_url
SSL=true
```

## Endpoints

Example endpoints:

## Testing Post Book:

Send POST request to api/books
with following JSON:

```json
{
"isbn": "9780062316097",
"title": "Sapiens: A Brief History of Humankind",
"authors": "Yuval Noah Harari",
"publisher": "Harper Perennial",
"published_date": "2015-02-10",
"description": "A sweeping narrative of humanitys creation and evolution.",
"imagelinks": "https://books.google.com/books/content?vid=ISBN9780062316097&printsec=frontcover&img=1&zoom=1"
}
'''
```
