const express = require('express');
const app = express();
const db = require('./db/connect');


//port info
const port = 5050;

//let the app know about json use
app.use(express.json());

//create routes
const homeRouter = require('./routesCtrl/index');
app.use('/', homeRouter);

const userRouter = require('./routesCtrl/users');
app.use('/users', userRouter);

const swaggerRouter = require('./routesCtrl/swagger');
app.use('/apiDocs', swaggerRouter);



app.listen(port, () => console.log(`Server listening on ${port}`));