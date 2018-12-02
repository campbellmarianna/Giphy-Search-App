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
var http = require('http');
// INITIALIZE THE GIPHY-API LIBRARY
var giphy = require('giphy-api')();

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Tell your Express app that your static files will live in the public folder
app.use(express.static('public'));

app.get('/hello-gif', function (req, res) {
    var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
    res.render('hello-gif', {gifUrl: gifUrl})
});

app.get('/greetings/:name', function (req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
});

// THIS
app.get('/', function (req, res) {
    var queryString = req.query.term;
    // Encode the query string to remove white spaces and restricted characters
    var term = encodeURIComponent(queryString);
    // Put the search term into the giphy API search URL
    var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

    http.get(url, function(response) {
        // Set encoding of response to utf8
        // READ ARTICLE ABOUT THIS TONIGHT
        response.setEncoding('utf8');

        var body = '';

        response.on('data', function(d) {
            // Continuously update stream with data from giphy
            body += d;
        });

        response.on('end', function() {
            // when data is fully received parse into JSON
            var parsed = JSON.parse(body);
            // Render the home template and pass the gif data into the template
            res.render('home', {gifs: parsed.data})
        });
    });
})

// OR THAT
// app.get('/', function (req, response) {
//     // if you get a search term for gifs with that term
//     if (req.query.term) {
//         giphy.search(req.query.term, function (err, response) {
//             console.log(err);
//             response.render('home', {gifs: res.data});
//         });
//     // if you don't get a search term display trending gifs
//     } else {
//         giphy.trending(function (err, res) {
//             response.render('home', {gifs: res.data});
//         });
//     }
// });


// Web Server Check
app.listen(3000, function() {
    console.log('Gif Search listening on port 3000!');
    //console.log('{term}');
});
