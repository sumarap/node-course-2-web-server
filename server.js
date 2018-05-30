const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');  // Setup for handlebars view engine (instead of ejs).
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to aoppend to server.log');
    }
  });
  next();
});

// TODO: new page. Push to github(git push), and push to heroku (git push heroku)
// 1) Create new url (/projects)
// 2) Make view file (same as home (replace existing <p> with 'portfolio page here'))
// 3) New link in partials header so we go to home/about/projects
// 4) git Push, then git push heroku

// Create new view maintenance.hbs
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// Because there is no next in the above middleware functions
// This use command doesn't execute, so the static public folder is not
// configured and the static 'help' page won't work either.
// If this static express is placed BEFORE the Maintenance
// middleware, the help page (and all static pages) WILL work (not really want we want)
app.use(express.static(__dirname + '/public'));

// Created HBS functions
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my home page!'
  });
});

app.get ('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    projectPageMessage: 'Welcome to the Projects Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Bad',
    message: 'This is the bad Page'
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
