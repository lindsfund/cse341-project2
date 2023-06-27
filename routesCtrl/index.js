const express = require('express');
const routes = express.Router();


//get homepage
routes.get('/', (req, res) => {
    res.send('Hello World from the index!');
  });

//get seeds info
routes.use('/seeds',require('./seeds'));

//get swagger info
//routes.use('/apiDocs', require('./swagger'));

  module.exports = routes;