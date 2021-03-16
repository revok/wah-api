import 'reflect-metadata';
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import routes from './api';
import { Container } from 'typedi';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import entryModel from './models/entry.model';
import userModel from './models/user.model';

// Load environment variables from .env
// If you're running this through the infra project these variables
// will already be in the environment through docker-compose.
dotenv.config();


// Connect to mongodb.
mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('connected to db!')
});


/*
* Inject the mongoose models into the DI container.
* This will (would) provide a lot of flexibility at the time of writing unit tests.
*/
Container.set('entryModel', entryModel);
Container.set('userModel', userModel);

// Create a new express app instance
const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


/*
* Connect the API routes, these are found under src/api/routes
*/
app.use('/', routes());

app.listen(process.env.API_PORT, function () {
  console.log(`API is listening on port ${process.env.API_PORT}!`);
});