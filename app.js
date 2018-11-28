/*
1. First we got the environment up and running with a simple hello world.

2. Then we setup the templating with Handlebars.js and updated our hello world to use a template.

3. Then we started from what the user sees - the template - and added a search form

4. Next we made sure that search term was making it to our server.

5. Then we proved we could get GIFs from Giphy.

6. Then we put our search term together with our proof we could get GIFs.
*/

// Express - define routes
var express = require('express');
//MIDDLEWARE - plugins or libraries we use to extend a web framework
var exphbs = require('express-handlebars');
// REQUIRE HTTP MODULE
// var http = require('http');
// INITIALIZE THE GIPHY-API LIBRARY
// var giphy = require('giphy-api')();

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Tell your Express app that your static files will live in the public folder
app.use(express.static('public'));



// app.get('/', function (req, res) {
//   console.log(req.query.term)
//   var queryString = req.query.term;
//   // ENCODE THE QUERY STRING TO REMOVE WHITE SPACES AND RESTRICTED CHARACTERS
//   var term = encodeURIComponent(queryString);
//   // PUT THE SEARCH TERM INTO THE GIPHY API SEARCH URL
//   var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'
//
//   http.get(url, function(response) {
//     // SET ENCODING OF RESPONSE TO UTF8
//     response.setEncoding('utf8');
//
//     var body = '';
//
//     response.on('data', function(d) {
//       // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
//       body += d;
//     });
//
//     response.on('end', function() {
//       // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
//       var parsed = JSON.parse(body);
//       // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
//       res.render('home', {gifs: parsed.data})
//     });
//   });
// })

// app.get('/', function (req, res) {
//     // if you get a search term search for gifs with that term
//     if (req.query.term) {
//         giphy.search(req.query.term, function (err, response) {
//           res.render('home', {gifs: response.data, term: req.query.term})
//         });
//     // if you don't get a search term display trending gifs
//     } else {
//         giphy.trending(function(err, response) {
//             res.render('home', {gifs: response.data})
//         })
//     }
// });

app.get('/hello-gif', function (req, res) {
    var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
    res.render('hello-gif', {gifUrl: gifUrl})
});

app.get('/greetings/:name', function (req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
})

// Question: Why is that what I submit in a input text field appears in the url path 
app.get('/', function (req, res) {
    res.render('home')
})

// Web Server Check
app.listen(3000, function() {
    console.log('Gif Search listening on port 3000!');
    //console.log('{term}');
});
