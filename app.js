const express = require('express');
const app = express();
const db = require('./db/connect'); 
const dotenv = require('dotenv');
const { query, matchedData, validationResult } = require('express-validator');
const session = require('express-session');


//port info
const port = 5050;


//let the app know about json use
app.use(express.json());

//load dotenv and passprt
dotenv.config();
require('./passport')(passport);

//sessions middleware
app.use(session({
  secret: 'nopedy',
  resave: false,
  saveUninitialized: false,
  //store
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

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