const express = require('express');
const expCrypto = require('express-crypto');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('in the authRoute');
});

router.post('/', async (req, res) => {
    //get login data from body
    const userLogin = [{userName: "Testing", password: "Testing", roles:["admin", "editor", "viewer"]}]

    //check user data against database
    try {
        userLogin.find(u => u.userName === req.body.userName);
    } catch (error) {
        //invalid userName
        res.status(400).json({message: error.message});
    }

    //check password against database
    try {
        userLogin.find(u => u.password === req.body.password);
    } catch (error) {
        //invalid password
        res.status(400).json({message: error.message});
    }

    //assign token
    const token = jwt.sign({
        id: userLogin.userName,
        roles: userLogin.roles,
    }, "jwtPrivateKey", {expiresIn: '15m'});

    //send out token
    res.send({
        ok: true,
        token: token
    })
})



module.exports = router;

