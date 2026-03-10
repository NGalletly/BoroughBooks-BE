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
PGDATABASE=borough_books_dev
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

## Endpoints

Example endpoints:
