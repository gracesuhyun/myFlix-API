const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.json()); 

let users = [
    {
        name: 'John Smith',
        usersMovies: ['High School Musical'],
        id: 1
    },
    {
        name: 'Jennie',
        usersMovies: ['Parasite'],
        id: 2
    }
]

let topMovies = [
    {
        title: 'Soul',
        director: {
            name: 'Pete Docter',
            description: 'Peter Hans Docter is an American animator, film director, screenwriter, producer, voice actor, and chief creative officer of Pixar.',
            birthDate: 'October 9, 1968'
        },
        releaseDate: 'October 11, 2020',
        genre: {
            name: 'Animation',
            description: 'Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery.'
        }
    },
    {
        title: 'Spiderman: No Way Home',
        director: {
            name: 'Jon Watts',
            description: 'Jonathan Watts is an American filmmaker. His credits include directing the Marvel Cinematic Universe superhero films Spider-Man: Homecoming, Spider-Man: Far From Home, and Spider-Man: No Way Home.',
            birthDate: 'June 28, 1981'
        },
        releaseDate: 'December 17, 2021',
        genre: {
            name: 'Superhero',
            description: 'Superhero fiction is a genre of speculative fiction examining the adventures, personalities and ethics of costumed crime fighters known as superheroes, who often possess superhuman powers and battle similarly powered criminals known as supervillains.'
        }
    },
    {
        title: 'My Neighbor Totoro',
        director: {
            name: 'Hayao Miyazaki',
            description: 'Hayao Miyazaki is a Japanese animator, director, producer, screenwriter, author, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.',
            birthDate: 'January 5, 1941'
        },
        releaseDate: 'May 7, 1993',
        genre: {
            name: 'Animation',
            description: 'Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery.'
        }
    },
    {
        title: 'The Old Guard',
        director: {
            name: 'Gina Prince-Bythewood',
            description: 'Gina Maria Prince-Bythewood is an American film director and screenwriter. She is known for directing the films Love & Basketball, Disappearing Acts, The Secret Life of Bees, Beyond the Lights, and The Old Guard.',
            birthDate: 'June 10, 1969'
        },
        releaseDate: 'July 10, 2020',
        genre: {
            name: 'Action',
            description: 'Action fiction is the literary genre that includes spy novels, adventure stories, tales of terror and intrigue ("cloak and dagger") and mysteries. This kind of story utilizes suspense, the tension that is built up when the reader wishes to know how the conflict between the protagonist and antagonist is going to be resolved or what the solution to the puzzle of a thriller is.'
        }
    },
    {
        title: 'Luca',
        director: {
            name: 'Enrico Casarosa',
            description: 'Enrico Casarosa is an Italian-American storyboard artist, film director, and writer who works at Pixar. In 2012, he was nominated for an Academy Award for the animated short film La Luna. In 2022, he was nominated for the Academy Award for Best Animated Feature for Luca.',
            birthDate: 'November 20, 1971'
        },
        releaseDate: 'June 18, 2021',
        genre: {
            name: 'Fantasy',
            description: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.'
        }
    },
    {
        title: 'Spirited Away',
        director: {
            name: 'Hayao Miyazaki',
            description: 'Hayao Miyazaki is a Japanese animator, director, producer, screenwriter, author, and manga artist. A co-founder of Studio Ghibli, he has attained international acclaim as a masterful storyteller and creator of Japanese animated feature films, and is widely regarded as one of the most accomplished filmmakers in the history of animation.',
            birthDate: 'January 5, 1941'
        },
        releaseDate: 'August 31, 2002',
        genre: {
            name: 'Animation',
            description: 'Animation is a method in which figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film. Today, most animations are made with computer-generated imagery.'
        }
    },
    {
        title: 'Along with the Gods',
        director: {
            name: 'Yong-Hwa Kim',
            description: 'Kim Yong-hwa is a South Korean film director and screenwriter. Kim wrote and directed Oh! Brothers, 200 Pounds Beauty, Take Off and Mr. Go.',
            birthDate: 'September 25, 1971'
        },
        releaseDate: 'December 20, 2017',
        genre: {
            name: 'Fantasy',
            description: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.'
        }
    },
    {
        title: 'Shang Chi and the Legend of the Ten Rings',
        director: {
            name: 'Destin Daniel Cretton',
            description: 'Destin Daniel Cretton is an American filmmaker. He is best known for his films Short Term 12, The Glass Castle, Just Mercy and the Marvel Studios film Shang-Chi and the Legend of the Ten Rings.',
            birthDate: 'November 23, 1978'
        },
        releaseDate: 'September 3, 2021',
        genre: {
            name: 'Superhero',
            description: 'Superhero fiction is a genre of speculative fiction examining the adventures, personalities and ethics of costumed crime fighters known as superheroes, who often possess superhuman powers and battle similarly powered criminals known as supervillains.'
        }
    },
    {
        title: 'The Dark Knight',
        director: {
            name: 'Christopher Nolan',
            description: 'Christopher Nolan CBE is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide, and have garnered 11 Academy Awards from 36 nominations. Born and raised in London, Nolan developed an interest in filmmaking from a young age.',
            birthDate: 'July 30, 1970'
        },
        releaseDate: 'July 18, 2008',
        genre: {
            name: 'Superhero',
            description: 'Superhero fiction is a genre of speculative fiction examining the adventures, personalities and ethics of costumed crime fighters known as superheroes, who often possess superhuman powers and battle similarly powered criminals known as supervillains.'
        }
    },
    {
        title: 'Tenet',
        director: {
            name: 'Christopher Nolan',
            description: 'Christopher Nolan CBE is a British-American film director, producer, and screenwriter. His films have grossed more than US$5 billion worldwide, and have garnered 11 Academy Awards from 36 nominations. Born and raised in London, Nolan developed an interest in filmmaking from a young age.',
            birthDate: 'July 30, 1970'
        },
        releaseDate: 'August 12, 2020',
        genre: {
            name: 'Science Fiction',
            description: 'Science fiction (sometimes shortened to sci-fi or SF) is a genre of speculative fiction which typically deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life.'
        }
    }
];


// CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('Name Required For All Users')
    }
})

app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);  //check to make sure user exists

    if (user) {
        user.usersMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s list`);
    } else {
        res.status(400).send('User Does Not Exist')
    }
})


// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.usersMovies = user.usersMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s list.`);
    } else {
        res.status(400).send('User Does Not Exist')
    }
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`User ${id} has been deleted.`);
    } else {
        res.status(400).send('User Does Not Exist')
    }
})


// UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('User Does Not Exist')
    }
})


// READ

app.get('/', (req, res) => {
    res.send('Welcome to my myFlix movie list!');
});
  
app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html');
});

app.get('/movies', (req, res) => {
    res.status(200).json(topMovies);
});

app.get('/movies/:title', (req, res) => {
    const { title } = req.params; //object destructuring
    const movie = topMovies.find(movie => movie.title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('Movie Not Found')
    }
});

app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params; //object destructuring
    const genre = topMovies.find(movie => movie.genre.name === genreName).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('Genre Not Found')
    }
});

app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params; //object destructuring
    const director = topMovies.find(movie => movie.director.name === directorName).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('Director Not Found')
    }
});


//error handling

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// // Gets the data about a single student, by name

// app.get('/students/:name', (req, res) => {
//     res.json(students.find((student) =>
//       { return student.name === req.params.name }));
//   });
  
//   // Adds data for a new student to our list of students.
//   app.post('/students', (req, res) => {
//     let newStudent = req.body;
  
//     if (!newStudent.name) {
//       const message = 'Missing name in request body';
//       res.status(400).send(message);
//     } else {
//       newStudent.id = uuid.v4();
//       students.push(newStudent);
//       res.status(201).send(newStudent);
//     }
//   });
  
//   // Deletes a student from our list by ID
//   app.delete('/students/:id', (req, res) => {
//     let student = students.find((student) => { return student.id === req.params.id });
  
//     if (student) {
//       students = students.filter((obj) => { return obj.id !== req.params.id });
//       res.status(201).send('Student ' + req.params.id + ' was deleted.');
//     }
//   });
  
//   // Update the "grade" of a student by student name/class name
//   app.put('/students/:name/:class/:grade', (req, res) => {
//     let student = students.find((student) => { return student.name === req.params.name });
  
//     if (student) {
//       student.classes[req.params.class] = parseInt(req.params.grade);
//       res.status(201).send('Student ' + req.params.name + ' was assigned a grade of ' + req.params.grade + ' in ' + req.params.class);
//     } else {
//       res.status(404).send('Student with the name ' + req.params.name + ' was not found.');
//     }
//   });
  
//   // Gets the GPA of a student
//   app.get('/students/:name/gpa', (req, res) => {
//     let student = students.find((student) => { return student.name === req.params.name });
  
//     if (student) {
//       let classesGrades = Object.values(student.classes); // Object.values() filters out object's keys and keeps the values that are returned as a new array
//       let sumOfGrades = 0;
//       classesGrades.forEach(grade => {
//         sumOfGrades = sumOfGrades + grade;
//       });
  
//       let gpa = sumOfGrades / classesGrades.length;
//       console.log(sumOfGrades);
//       console.log(classesGrades.length);
//       console.log(gpa);
//       res.status(201).send('' + gpa);
//       //res.status(201).send(gpa);
//     } else {
//       res.status(404).send('Student with the name ' + req.params.name + ' was not found.');
//     }
//   });
  
  
// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});