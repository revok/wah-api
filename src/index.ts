import express = require('express');

// Create a new express app instance
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello World!!');
});


app.listen(8080, function () {
  console.log('App is listening on port 8080!');
});