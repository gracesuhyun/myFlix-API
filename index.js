const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose');

const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));



// CREATE USER
app.post('/users', (req, res) => {
    Users.findOne({Username: req.body.Username})
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users.create({
                    Username: req.body.Username,
                    Password: req.body.Password,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
                })
                .then((user) => {res.status(201).json(user) })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// ADD MOVIE TO USERS LIST
app.post('/users/:id/favorites/:title', (req, res) => {
    res.status(200);
});


// READ
app.get('/', (req, res) => {
    res.send('Welcome to my myFlix movie list!');
});
  
app.get('/documentation', (req, res) => {      //not working???          
    res.sendFile('public/documentation.html'); 
});

app.get('/movies', (req, res) => {
    Movies.find().then((movies) => {
        res.status(200).json(movies);
    });
});

app.get('/movies/:title', (req, res) => {
    Movies.findOne({ Title: req.params.title }).then((movie) => {
        if (movie) {
          res.status(200).json(movie);
        } else {
          res.status(400).send('Movie not Found');
        }
    });
});

app.get('/movies/genre/:genreName', (req, res) => {
    Movies.findOne({ Title: req.params.title }).then((movie) => {
        if (movie) {
          res.status(200).send(`${req.params.title} is a ${movie.Genre.Name}`);
        } else {
          res.status(400).send('Movie not Found');
        }
    });
});

app.get('/movies/directors/:directorName', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.name }).then((movie) => {
        if (movie) {
          res.status(200).json(movie.Director);
        } else {
          res.status(400).send('Director Not Found');
        }
    });
});

// GET ALL USERS
app.get('/users', function(req,res) {
    Users.find()
    .then(function(users) {
        res.status(201).json(users);
    })
    .catch(function(err) {
        console.err(err);
        res.status(500).send('Error: ' + err);
    });
});

// app.get('/users', (req, res) => {
//     Users.find()
//       .then((users) => {
//         res.status(201).json(users);
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error: ' + err);
//       });
// });

// GET USER BY USERNAME
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});


// UPDATE USER INFO
app.put('/users/:Username', (req, res) => {
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


// DELETE
app.delete('/users/:id/favorites/:title', (req, res) => {
    res.status(200);
});

// DELETE USER BY USERNAME
app.delete('/users/:Username', (req, res) => {
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
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});