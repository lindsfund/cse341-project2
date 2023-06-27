const dotenv = require('dotenv');
dotenv.config();

const {MongoClient} = require('mongodb');

let _db;

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const cluster = process.env.DB_CLUSTER;

