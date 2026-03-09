# BoroughBooks-BE

Requirements

- Node v22.14.0

## Getting Started:

Please check `package.json` for dependencies and run

```
npm install
```

Dependencies Installed (manual commands if needed)
Node: npm install
Jest: npm install --save-dev jest
JestSorted: npm install --save-dev jest-sorted
Express: npm install express
Cors: npm install cors
SuperTest: npm install supertest --save-dev
Dotenv: npm install dotenv --save
Nodemon: npm install --save-dev nodemon
PostGres: npm install pg
PostGres Format: npm install pg-format

To start please create your own .env files in root directory:

- `.env.test`
- `.env.development`

In these files please connect to the connection.js by placing the following their respective .env.test and env.development files:

```
PGDATABASE = BoroughBooks_test
PGDATABASE = BoroughBooks_dev
```

Once this is done please ensure you have .env.\* in your .gitignore

To check if this is working console.log the ENV variable in connection.js in jest test and in development environment to see it toggle from test to development.
const ENV = process.env.NODE_ENV || 'development'

### Creating Test and Development Databases:

To create Databases navigate to the db folder and run:

<!-- ```
psql -f setup-dbs.sql
``` -->
