const express = require('express');
const router = express.Router();

const usersRoute = require('./users');
const swaggerRoute = require('./swagger');
const authRoute = require('./auth');

router.get('/', (req,res) => {
    res.send('HOMEPAGE')
});

router.use('/users', usersRoute);

router.use('/apiDocs', swaggerRoute);

router.use('/auth', authRoute);


module.exports = router;