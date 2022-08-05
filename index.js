const cors = require('cors');

const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models.js'),
    app = express(),
    { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;

app.use(cors());
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport'); 

mongoose.connect('mongodb+srv://testuser:TestUser@myflixdb.d5y2zjb.mongodb.net/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });


// READ
app.get('/', (req, res) => {
    res.send('Welcome to my myFlix movie list!');
});
  
app.get('/documentation', (req, res) => { 
    res.sendFile('public/documentation.html', { root: __dirname }); 
});


// Return a list of all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Return data about a single movie by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title }).then((movie) => {
        if (movie) {
          res.status(200).json(movie);
        } else {
          res.status(400).send('Movie not Found');
        }
    });
});

// Return data about a genre by movie title
app.get('/movies/genre/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movies) => {
          if (movies) {
            res.status(200).send(`${req.params.Title} is a ${movies.Genre.name} movie. <br> ${movies.Genre.description}`);
          } else {
            res.status(400).send('Movie not Found');
          }
      });
});

// Return data about a genre by name
app.get('/genre/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ 'Genre.name': req.params.Name })
      .then((movie) => {
          res.json(movie.Genre);
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send('Error: ' + err);
      });
  });

// Return data about a director by name
app.get('/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ 'Director.name': req.params.Name }).then((movies) => {
        if (movies) {
          res.status(200).json(movies.Director);
        } else {
          res.status(400).send('Director Not Found');
        }
    });
});

// Return a list of all users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

// Return data about a single user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});


app.post('/users',
    // Validation logic request
    // you can either use a chain of methods like .not().isEmpty()
    // which means "opposite of isEmpty" in plain English "is not empty"
    // or use .isLength({min: 5}) which means
    // minimum value of 5 characters are only allowed
    [
      check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
      check('Password', 'Password is required.').not().isEmpty(),
      check('Email', 'Email does not appear to be valid.').isEmail()
    ], (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
        .then((user) => {
            if (user) { //If the user is found, send a response that it already exists
                return res.status(400).send(req.body.Username + 'already exists.');
            } else {
              Users
                .create({
                    Username: req.body.Username,
                    Password: hashedPassword,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
                })
                .then((user) => { res.status(201).json(user) })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
    });
});

// Create user; allow new users to register
// app.post('/users',
//   // Validation logic here for request
//   //you can either use a chain of methods like .not().isEmpty()
//   //which means "opposite of isEmpty" in plain english "is not empty"
//   //or use .isLength({min: 5}) which means minimum value of 5 characters are only allowed
//   [
//     check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
//     check('password', 'Password is required').not().isEmpty(),
//     check('email', 'Email does not appear to be valid').isEmail()
//   ], (req, res) => {

//   // check validation object for errors
//   //if error occurs, rest of code will not execute, keeping database safe from potentially malicious code
//     let errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }

//     let hashedPassword = Users.hashPassword(req.body.Password);
//     Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
//       .then((user) => {
//         if (user) {
//           //If the user is found, send a response that it already exists
//           return res.status(400).send(req.body.Username + ' already exists');
//         } else {
//           Users
//             .create({
//               Username: req.body.Username,
//               Password: hashedPassword,
//               Email: req.body.Email,
//               Birthday: req.body.Birthday
//             })
//             .then((user) => { res.status(201).json(user) })
//             .catch((error) => {
//               console.error(error);
//               res.status(500).send('Error: ' + error);
//             });
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).send('Error: ' + error);
//       });
//   });

// Allow users to update their user info
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allow users to add movie to their list
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
Users.findOneAndUpdate({ Username: req.params.Username }, {
   $push: { FavoriteMovies: req.params.MovieID }
 },
 { new: true }, // This line makes sure that the updated document is returned
(err, updatedUser) => {
  if (err) {
    console.error(err);
    res.status(500).send('Error: ' + err);
  } else {
    res.json(updatedUser);
  }
});
});


// Allow users to remove movie from their list
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $pull: { FavoriteMovies: req.params.MovieID }
   },
   { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
  });

// Allows users to deregister
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });


//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

  
// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});