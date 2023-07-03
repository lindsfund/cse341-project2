const express = require('express');
const expCrypto = require('express-crypto');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async (req, res) => {
    //get login data from body
    const userLogin = [{userName: "Testing", password: "Testing", roles:["admin", "editor", "viewer"]}]

    //check user data against database
    let user = userLogin.find(u => u.userName === req.body.userName);
    if(!user) throw new Error('invalid UserName');

    //check password against database
    let pswd = userLogin.find(u => u.password === req.body.password);
    if(!password) throw new Error('invalid password');


    //assign token
    const token = jwt.sign({
        id: user.userName,
        roles: user.roles,
    }, "jwtPrivateKey", {expiresIn: '15m'});

    //send out token
    res.send({
        ok: true,
        token: token
    })
})



module.exports = router;

