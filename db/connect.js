const dotenv = require('dotenv');
dotenv.config();

const {MongoClient} = require('mongodb');

let _db;

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);
const cluster = process.env.DB_CLUSTER;

let URI = `mongodb+srv://${username}:${password}@${cluster}`;

const client = new MongoClient(URI);

//init DB connection
const initDb = (callback) => {
    //check if connection is already running send message if so
    if(_db) {console.log('DB is initialized');
    return callback(null,_db);
}
    //connect to MongoDb
    MongoClient.connect(URI)
        .then((client)=>{
            _db = client;
            callback(null, _db);
        })
        //catch errors
        .catch((err)=>{
            callback(err);
        });
};

//get the DB data
const getDb = () => {
    if(!_db){
        throw error('DB not initialized');
    }
    return _db;
}

module.exports = {
    initDb,
    getDb,
};
