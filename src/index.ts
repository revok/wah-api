import * as dotenv from 'dotenv';
import express = require('express');

dotenv.config();


// Create a new express app instance
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello World!!');
});

app.listen(process.env.API_PORT, function () {
  console.log(`API is listening on port ${process.env.API_PORT}!`);
});