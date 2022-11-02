## myFlix API
This project is a REST API which will serve as the server-side component for both the [myFlix-client](https://github.com/gracesuhyun/myFlix-client) and [myFlix-Angular-client](https://github.com/gracesuhyun/myFlix-Angular-client) movie app projects. The myFlix API will interact with a database that stores data about different movies.

## Key Features
- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a
single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister

## Dependencies
```
  "dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.20.0",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "express-validator": "^6.14.1",
    "jsonwebtoken": "^8.5.1",
    "lodash": "^4.17.21",
    "mongoose": "^6.3.3",
    "morgan": "^1.10.0",
    "passport": "^0.5.3",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "uuid": "^8.3.2"
  },
  "devDependencies": {
    "eslint": "^8.14.0",
    "nodemon": "^2.0.16"
  }
```