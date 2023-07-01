const express = require('express');
const app = express();
const db = require('./db/connect');


//port info
const port = 5050;

//let the app know about json use
app.use(express.json());

//create routes
const userRouter = require('./routesCtrl/users');
app.use('/users', userRouter);



app.listen(port, () => console.log(`Server listening on ${port}`));