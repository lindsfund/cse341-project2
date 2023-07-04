const express = require('express');
const app = express();
const db = require('./db/connect'); 
const { query, matchedData, validationResult } = require('express-validator');



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

app.get('/hello', query('person').notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if(result.isEmpty()){
    const data = matchedData(req);
    return res.send(`Hello, ${data.person}!`);
  }
  
  res.send({errors: result.array()});
});

db;
app.listen(port, () => console.log(`Server listening on ${port}`));