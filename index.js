const express = require('express'),
    morgan = require('morgan');
const app = express();

let topMovies = [
    {
        title: 'Soul',
        director: 'Pete Docter',
        releaseDate: 'October 11, 2020'
    },
    {
        title: 'Spiderman: No Way Home',
        director: 'Jon Watts',
        releaseDate: 'December 17, 2021'
    },
    {
        title: 'My Neighbor Totoro',
        director: 'Hayao Miyazaki',
        releaseDate: 'May 7, 1993'
    },
    {
        title: 'The Old Guard',
        director: 'Gina Prince-Bythewood',
        releaseDate: 'July 10, 2020'
    },
    {
        title: 'Luca',
        director: 'Enrico Casarosa',
        releaseDate: 'June 18, 2021'
    },
    {
        title: 'Spirited Away',
        director: 'Hayao Miyazaki',
        releaseDate: 'August 31, 2002'
    },
    {
        title: 'Along with the Gods',
        director: 'Yong-Hwa Kim',
        releaseDate: 'December 20, 2017'
    },
    {
        title: 'Shang Chi and the Legend of the Ten Rings',
        director: 'Destin Daniel Cretton',
        releaseDate: 'September 3, 2021'
    },
    {
        title: 'The Dark Knight',
        director: 'Christopher Nolan',
        releaseDate: 'July 18, 2008'
    },
    {
        title: 'Tenet',
        director: 'Christopher Nolan',
        releaseDate: 'August 12, 2020'
    }
];


app.use(express.static('public'));
app.use(morgan('common'));

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my myFlix movie list!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html');
  });
  
  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });
  
  
  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });