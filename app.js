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

app.get('/hello-gif', function (req, res) {
    var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
    res.render('hello-gif', {gifUrl: gifUrl});
});

// add GET route
app.get('/greetings/:name', function (req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
    //console.log('{term}');
});

app.get('/', function (req, res) {
  var queryString = req.query.term
  giphy.search(req.query.term, function (err, response) {
      console.log(response)
      res.render('home', {gifs: response.data})
    });
})
