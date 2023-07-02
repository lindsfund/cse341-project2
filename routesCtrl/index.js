const express = require('express');
const router = express.Router();

const usersRoute = require('./users');
const swaggerRoute = require('./swagger');

router.get('/', (req,res) => {
    res.send('HOMEPAGE')
});

router.use('/users', usersRoute);

router.use('/apiDocs', swaggerRoute);


module.exports = router;