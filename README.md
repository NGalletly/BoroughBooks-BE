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
PGDATABASE=[YOUR_DATABASE_NAME]
PGDATABASE=[YOUR_DATABASE_NAME]
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

### GET Requests

- <b>/api/books</b></br>
  Retrieve an object containing an array of all books, where each book is an object</br>
  Example response:</br>

  ```json
  {
    "books": [
      {
        "isbn": "9780679723394",
        "title": "Speak, Memory",
        "authors": "Vladimir Nabokov",
        "publisher": "Vintage International",
        "published_date": "1989-07-11T23:00:00.000Z",
        "description": "A memoir of Nabokov's privileged childhood in pre-revolutionary Russia and his years of European emigration, widely considered one of the finest autobiographies of the twentieth century.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780679723394&printsec=frontcover&img=1&zoom=1"
      },
      {
        "isbn": "9781608464456",
        "title": "Freedom Is a Constant Struggle: Ferguson, Palestine, and the Foundations of a Movement",
        "authors": "Angela Y. Davis",
        "publisher": "Haymarket Books",
        "published_date": "2016-02-01T00:00:00.000Z",
        "description": "Angela Davis examines the connections between struggles against state violence and oppression throughout history and around the world, arguing that we must build on legacies of resistance to forge a new, more expansive vision of freedom.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9781608464456&printsec=frontcover&img=1&zoom=1"
      },
      {
        "isbn": "9780374529529",
        "title": "Memoirs of Hadrian",
        "authors": "Marguerite Yourcenar",
        "publisher": "Farrar, Straus and Giroux",
        "published_date": "2005-03-31T23:00:00.000Z",
        "description": "A fictional memoir of the Roman Emperor Hadrian, written in the form of a letter to his adopted grandson Marcus Aurelius, meditating on power, love, and the nature of the self.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780374529529&printsec=frontcover&img=1&zoom=1"
      },
      {
        "isbn": "9781784870911",
        "title": "Life and Fate",
        "authors": "Vasily Grossman",
        "publisher": "Vintage Classics",
        "published_date": "2006-05-31T23:00:00.000Z",
        "description": "Set during the Battle of Stalingrad, this epic novel draws parallels between Nazi and Stalinist totalitarianism and follows the Shaposhnikov family through the brutal crucible of the Second World War.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9781784870911&printsec=frontcover&img=1&zoom=1"
      },
      {
        "isbn": "9780141189383",
        "title": "Alone in Berlin",
        "authors": "Hans Fallada",
        "publisher": "Penguin Modern Classics",
        "published_date": "2009-08-26T23:00:00.000Z",
        "description": "Based on a true story, this novel follows a working-class Berlin couple who begin a secret campaign of resistance against the Nazi regime after the death of their son in the war.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780141189383&printsec=frontcover&img=1&zoom=1"
      }
    ]
  }
  ```

- <b>/api/users</b></br>
  Retrieve an object containing an array of all users, where each user is an object</br>
  Example response:</br>

  ```json
  {
    "users": [
      {
        "username": "gavinHousley",
        "profile_pic_url": ""
      },
      {
        "username": "jovaScript",
        "profile_pic_url": ""
      },
      {
        "username": "coolSurferDude",
        "profile_pic_url": ""
      },
      {
        "username": "nomi",
        "profile_pic_url": ""
      },
      {
        "username": "ESerebrianik",
        "profile_pic_url": ""
      }
    ]
  }
  ```

- <b>/api/users/:username</b></br>
  Retrive an object containing an array with a single user object</br>
  Example response (username = "jovaScript"):

  ```json
  {
    "user": [
      {
        "username": "jovaScript",
        "profile_pic_url": ""
      }
    ]
  }
  ```

- <b>/api/users/:username/my-library</b></br>
  Retrieve an object containing all books available to borrow in a single user's library</br>
  Example response (username = "nomi"):

  ```json
  {
    "books": [
      {
        "isbn": "9780441569595",
        "title": "Neuromancer",
        "authors": "William Gibson",
        "publisher": "Ace Books",
        "published_date": "2000-06-30T23:00:00.000Z",
        "description": "Case is a washed-up computer criminal hired by a mysterious employer to pull off the ultimate hack. A seminal cyberpunk novel that coined the term 'cyberspace' and shaped modern science fiction.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780441569595&printsec=frontcover&img=1&zoom=1"
      },
      {
        "isbn": "9780140154511",
        "title": "The Earthsea Quartet",
        "authors": "Ursula K. Le Guin",
        "publisher": "Penguin Books",
        "published_date": "1993-01-01T00:00:00.000Z",
        "description": "Collects the first four books of Le Guin's landmark fantasy series: A Wizard of Earthsea, The Tombs of Atuan, The Farthest Shore, and Tehanu — following the wizard Ged across a vast archipelago world.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780140154511&printsec=frontcover&img=1&zoom=1"
      },
      {
        "isbn": "9780441627400",
        "title": "The Once and Future King",
        "authors": "T. H. White",
        "publisher": "Ace Books",
        "published_date": "1987-04-30T23:00:00.000Z",
        "description": "A sweeping retelling of the Arthurian legend, from the boyhood education of the Wart by Merlyn to the tragedy of Camelot and the fall of a great king's dream of a just civilization.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780441627400&printsec=frontcover&img=1&zoom=1"
      },
      {
        "isbn": "9780618640157",
        "title": "The Lord of the Rings",
        "authors": "J. R. R. Tolkien",
        "publisher": "Mariner Books",
        "published_date": "2005-09-20T23:00:00.000Z",
        "description": "The complete single-volume edition of Tolkien's epic fantasy trilogy, following hobbit Frodo Baggins and the Fellowship of the Ring on their quest to destroy the One Ring and defeat the Dark Lord Sauron.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780618640157&printsec=frontcover&img=1&zoom=1"
      }
    ]
  }
  ```

- <b>/api/users/:username/my-library/:isbn</b></br>
  Retrieve an object containing a single book available to borrow in a single user's library</br>
  Example response (username = "jovaScript", isbn = "9780679723394"):

  ```json
  {
    "usersBookByIsbn": [
      {
        "username": "jovaScript",
        "isbn": "9780679723394",
        "title": "Speak, Memory",
        "authors": "Vladimir Nabokov",
        "publisher": "Vintage International",
        "published_date": "1989-07-11T23:00:00.000Z",
        "description": "A memoir of Nabokov's privileged childhood in pre-revolutionary Russia and his years of European emigration, widely considered one of the finest autobiographies of the twentieth century.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780679723394&printsec=frontcover&img=1&zoom=1"
      }
    ]
  }
  ```

- <b>/api/books/:isbn</b></br>
  Retrieve an object containing an array containing an object with a single book object

  ```json
  {
    "book": [
      {
        "isbn": "9780140154511",
        "title": "The Earthsea Quartet",
        "authors": "Ursula K. Le Guin",
        "publisher": "Penguin Books",
        "published_date": "1993-01-01T00:00:00.000Z",
        "description": "Collects the first four books of Le Guin's landmark fantasy series: A Wizard of Earthsea, The Tombs of Atuan, The Farthest Shore, and Tehanu — following the wizard Ged across a vast archipelago world.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780140154511&printsec=frontcover&img=1&zoom=1"
      }
    ]
  }
  ```

- <b>/api/users/:username/friends</b></br>
  Retrieve an object containing an array of all information about thheir profile's friends</br>
  Example response (for username = "jovascript"):

  ```json
  {
    "usersFriends": [
      {
        "user_relationship_id": 1,
        "origin_username": "jovaScript",
        "relating_username": "gavinHousley",
        "friend_status": "accepted",
        "profile_pic_url": ""
      },
      {
        "user_relationship_id": 2,
        "origin_username": "jovaScript",
        "relating_username": "nomi",
        "friend_status": "accepted",
        "profile_pic_url": ""
      }
    ]
  }
  ```

- <b>/api/users/:username/loaned</b></br>
  Retrieve an object containing an array where each element is an object storing information about which books have been loaned out by a single user</br>
  Example Response (username = "jovaScript"):

  ```json
  {
    "books": [
      {
        "isbn": "9780441569595",
        "title": "Neuromancer",
        "authors": "William Gibson",
        "publisher": "Ace Books",
        "published_date": "2000-06-30T23:00:00.000Z",
        "description": "Case is a washed-up computer criminal hired by a mysterious employer to pull off the ultimate hack. A seminal cyberpunk novel that coined the term 'cyberspace' and shaped modern science fiction.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780441569595&printsec=frontcover&img=1&zoom=1",
        "borrower_id": "nomi"
      }
    ]
  }
  ```

- <b>/api/users/:username/borrowed</b></br>
  Retrieve an object containing an array where each element is an object storing information about which books have been borrowed by a single user</br>
  Example Response (username = "coolSurferDude"):

  ```json
  {
    "books": [
      {
        "isbn": "9780140154511",
        "title": "The Earthsea Quartet",
        "authors": "Ursula K. Le Guin",
        "publisher": "Penguin Books",
        "published_date": "1993-01-01T00:00:00.000Z",
        "description": "Collects the first four books of Le Guin's landmark fantasy series: A Wizard of Earthsea, The Tombs of Atuan, The Farthest Shore, and Tehanu — following the wizard Ged across a vast archipelago world.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780140154511&printsec=frontcover&img=1&zoom=1",
        "username": "gavinHousley"
      },
      {
        "isbn": "9781567923384",
        "title": "Nox",
        "authors": "Anne Carson",
        "publisher": "New Directions",
        "published_date": "2010-05-17T23:00:00.000Z",
        "description": "An accordion-fold facsimile of a handmade book, Nox is Anne Carson's elegy for her brother, interweaving a translation of Catullus 101 with photographs, dictionary definitions, and fragments of memory.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9781567923384&printsec=frontcover&img=1&zoom=1",
        "username": "groovySkaterGirl"
      }
    ]
  }
  ```

- <b>/api/users/:username/wish-list</b></br>
  Retrieve an object contianing an array of a user's wish-listed books</br>
  Example Response:

  ```json
  {
    "usersWishList": [
      {
        "isbn": "9780374529529",
        "username": "jovaScript",
        "title": "Memoirs of Hadrian",
        "authors": "Marguerite Yourcenar",
        "publisher": "Farrar, Straus and Giroux",
        "published_date": "2005-03-31T23:00:00.000Z",
        "description": "A fictional memoir of the Roman Emperor Hadrian, written in the form of a letter to his adopted grandson Marcus Aurelius, meditating on power, love, and the nature of the self.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780374529529&printsec=frontcover&img=1&zoom=1"
      },
      {
        "isbn": "9780143039945",
        "username": "jovaScript",
        "title": "Gravity's Rainbow",
        "authors": "Thomas Pynchon",
        "publisher": "Penguin Books",
        "published_date": "2006-05-29T23:00:00.000Z",
        "description": "Set in the final months of World War II, this monumental and labyrinthine novel follows dozens of characters across a paranoid landscape shaped by rocket technology, corporate conspiracy, and occult forces.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780143039945&printsec=frontcover&img=1&zoom=1"
      },
      {
        "isbn": "9780441627400",
        "username": "jovaScript",
        "title": "The Once and Future King",
        "authors": "T. H. White",
        "publisher": "Ace Books",
        "published_date": "1987-04-30T23:00:00.000Z",
        "description": "A sweeping retelling of the Arthurian legend, from the boyhood education of the Wart by Merlyn to the tragedy of Camelot and the fall of a great king's dream of a just civilization.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780441627400&printsec=frontcover&img=1&zoom=1"
      }
    ]
  }
  ```

  - <b>/api/conversations</b></br>
    Retrieve an object containing an array of conversations</br>
    Example Response:

  ```json
  {
    "conversations": [
      {
        "conversation_id": 1,
        "user1_username": "jovaScript",
        "user2_username": "nomi",
        "created_at": "2026-03-18T10:00:00.000Z"
      },
      {
        "conversation_id": 2,
        "user1_username": "jovaScript",
        "user2_username": "coolSurferDude",
        "created_at": "2026-03-18T11:15:00.000Z"
      }
    ]
  }
  ```

  - <b>/api/conversations/:username</b></br>
    Retrieve an object containing an array of conversations based on username</br>
    Example Response:

  ```json
  {
    "conversations": [
      {
        "conversation_id": 1,
        "user1_username": "jovaScript",
        "user2_username": "nomi",
        "created_at": "2026-03-18T10:00:00.000Z"
      }
    ]
  }
  ```

  - <b>/api/conversations/:conversation_id/messages</b></br>
    Retrieve an object containing an array of messages based on the conversation id</br>
    Example Response:

  ```json
  {
    "messages": [
      {
        "message_id": 1,
        "conversation_id": 1,
        "sender_username": "jovaScript",
        "content": "Hey, have you read Midnight library already?",
        "sent_at": "2026-03-18T10:01:00.000Z",
        "read_at": "2026-03-18T10:05:00.000Z"
      },
      {
        "message_id": 2,
        "conversation_id": 1,
        "sender_username": "nomi",
        "content": "Yeah, do you want to borrow it?",
        "sent_at": "2026-03-18T10:02:00.000Z",
        "read_at": null
      }
    ]
  }
  ```

### Post Requests:

- <b>/api/books</b></br>
  Post a new book to the "books" table.</br>
  The <i>request</i> body must be of the the following form:
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
  ```
  Successful requests give a <i>response</i> with the shape of the following example:
  ```json
  {
    "newBook": [
      {
        "isbn": "9780062316097",
        "title": "Sapiens: A Brief History of Humankind",
        "authors": "Yuval Noah Harari",
        "publisher": "Harper Perennial",
        "published_date": "2015-02-10",
        "description": "A sweeping narrative of humanitys creation and evolution.",
        "imagelinks": "https://books.google.com/books/content?vid=ISBN9780062316097&printsec=frontcover&img=1&zoom=1"
      }
    ]
  }
  ```
- <b>/api/users/:username/my-library</b></br>
  Post a book to the users-books table associated with their username.</br>
  The <i>request</i> body should be of the following form:

  ```json
  {
    "isbn": "9780140154511"
  }
  ```

  Successful requests will return a <i>response</i> object with the form:

  ```json
  {
    "postedBookToLibrary": [
      {
        "users_book_id": 21,
        "isbn": "9780140154511",
        "username": "jovaScript"
      }
    ]
  }
  ```

- <b>/api/users/:username/friends</b></br>
  Post a pending friendship between two users. These are "friend requests", and are designed to always initially contain a "pending" value for the friend's status</br>
  The <i>request</i> body should be sent with the following shape:

  ```json
  { "relating_username": "coolSurferDude" }
  ```

  where the relating_username is the friend-to-be.</br>
  Successful requests will return a <i>response</i> body with the following shape

  ```json
  {
    "usersNewFriendRequest": [
      {
        "user_relationship_id": 9,
        "origin_username": "groovySkaterGirl",
        "relating_username": "coolSurferDude",
        "friend_status": "pending"
      }
    ]
  }
  ```

- <b>/api/conversations</b></br>
  Post a conversation between two users
  The <i>request</i> body should be sent with the following shape:

  ```json
  {
    "user1_username": "nomi",
    "user2_username": "jovaScript"
  }
  ```

  Will get a 201 with response similar to the below (the date of created_at is taken from postgres)

  ```json
  {
    "conversation": {
      "conversation_id": 1,
      "user1_username": "nomi",
      "user2_username": "jovaScript",
      "created_at": "2026-03-18T15:40:46.341Z"
    }
  }
  ```

  - <b>/api/messages</b></br>
    Send a new message in a conversation</br>
    Example Request Body:

  ```json
  {
    "conversation_id": 1,
    "sender_username": "nomi",
    "content": "Hey, are you around?"
  }
  ```

  ```json
  {
    "message": {
      "message_id": 1,
      "conversation_id": 1,
      "sender_username": "nomi",
      "content": "Hey, are you around?",
      "sent_at": "2026-03-18T10:01:00.000Z",
      "read_at": null
    }
  }
  ```

### Patch Requests:

- <b>/api/users/:username/loaned</b></br>
  Patch and update the return status of a loaned book with the loan_id by adding a return date.</br>
  Response will be 204 - No content for a successful patch. Here is an example of the object to be sent. Please note the date format.

  ```json
  {
    "loan_id": 1,
    "return_date": "2026-03-16T23:00:00.000Z"
  }
  ```

- <b>/api/users/:username/friends</b></br>
  Update the friend status between 2 particular users</br>
  The request body should be sent as (as an example):
  ```json
  { "user_relationship_id": 6 }
  ```

### DELETE Requests:

- <b>/api/users/:username/:ISBN</b></br>
  Successful requests will remove a book by its ISBN from a specified user's library. This removes the record associated with that ISBN and the specified username from the users-books table.
  <br></br>
- <b>/api/users/:username/friends</b></br>
  Delete a friend from a user's friend list or reject a friend request.
- <b>/api/users/:username/wish-list/:isbn</b></br>
  Delete a book from a user's wish list using their username and the isbn of the book they want to delete
- <b>/api/users/:username/loaned/:users_book_id</b></br>
  Deletes a loan record, marking a book as returned. This removes the loan entry from the loans table for the specified users_book_id.
