const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 5000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

app.set('view engine','hbs');
app.use((request, response, next) => {
  var currentTimestamp = new Date().toString();
  var logLine = `${currentTimestamp} : ${request.method} | ${request.url}`;
  console.log(logLine);
  fs.appendFileSync('server.log', logLine + '\n', (err) => {
    if(err){
      console.log('Unable to append log');
    }
  });
  next();
});

// app.use((request,response,next) => {
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


app.get('/', (request, response) => {
  response.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my express website.'
  });
});

app.get('/about',(request, response) => {
  response.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/projects',(request, response) => {
  response.render('projects.hbs',{
    pageTitle: 'Projects Page'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Something went wrong! We are working on it.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
