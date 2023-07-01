const express = require('express');
const app = express();
const db = require('./db/connect');


//port info
const port = 5050;



app.listen(port, () => console.log(`Server listening on ${port}`));