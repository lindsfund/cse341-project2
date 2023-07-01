const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//* connect to MongoDb via mongoose
const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const cluster = process.env.DB_CLUSTER;

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}`);  
const db = mongoose.connection;  
  //show connection error
  db.on('error', (error) => console.log(error));
  //show successful connection
  db.once('open', () => console.log('Connected to DB'));


module.exports = db;