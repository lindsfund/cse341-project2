const express = require('express');
const mongodb = require('./db/connect');


const app = express();
const port = 5050;

// app.get('/hello', (req, res) => {
//     res.send('Hello World!');
//   });

//use the files in the routesCtrl folder
  app.use('/',require('./routesCtrl/index'));
  
 mongodb.initDb((err)=>{
    if(err) {
        console.log(err);
    } else {
        app.listen(process.env.PORT || port, () => {
            console.log(`listening on port ${port}`);
          });
    }
 })