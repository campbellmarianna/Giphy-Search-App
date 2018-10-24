// Express - define routes
var express = require('express');
var app = express();

//MIDDLEWARE - plugins or libraries we use to extend a web framework
var exphbs = require('express-handlebars');

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

// Connectin to the Giphy API with http
// REQUIRE HTTP MODULE
var http = require('http');

// add a ROOT ROUTE
app.get('/', function (req, res) {
  //console.log(req.query)
  var queryString = req.query.term;
  // ENCODE THE QUERY STRING TO REMOVE WHITE SPACES AND RESTRICTED CHARACTERS
  var term = encodeURIComponent(queryString);
  // PUT THE SEARCH TERM INTO THE GIPHY API SEARCH URL
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

  http.get(url, function(response) {
      // SET ENCODING OF RESPONSES TO UTF8
      response.setEncoding('utf8');

      var body = '';

      response.on('data', function(d) {
          // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
          body += d;
      });

      response.on('end', function() {
          // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
          var parsed = JSON.parse(body);
          // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
          res.render('home', {gifs: parsed.data})
      });
  })
})
