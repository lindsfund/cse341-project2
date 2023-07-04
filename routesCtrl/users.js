const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { userValidationRules, validate } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


//get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//get one user
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

//create user
router.post('/', userValidationRules(), validate, async (req, res) => {
    
    try {
        //hashing password
        //const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // build new User
        const user = new User({
            userName: req.body.userName,
            password: hashedPassword
        });
        // save new User
        const newUser = await user.save();
        res.status(201).json(newUser);
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}); 

//update user
router.patch('/:id', getUser, async (req, res) => {
    if(req.body.userName) {
        res.user.userName = req.body.userName;
    }
    if(req.body.password) {
        res.user.password = req.body.password;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//delete user
router.delete('/:id', getUser,  async (req, res) => {
    try {
        await res.user.deleteOne({_id : ':id'});
        res.json({message:'Deleted user'})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//login user
router.post('/login', async (req, res) => {
    const userNameBody = req.body.userName;
    const user = await User.find({userName: userNameBody}); 
    if(!user){
      return res.status(400).send('Invalid UserName');
    } 
        try {
            if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Login success');
            
            } else {
            res.send('access denied');
            }
        
        } catch (error) {
            res.status(500).send('Server Error')
        }

//jwt
const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
res.json({accesstoken: accesstoken});
});

//* MIDDLEWARE
async function getUser(req,res,next){
    let user;
    try {
        user = await User.findById(req.params.id);
        if(user == null) {
            return res.status(404).json({message:'cannot find user'});
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.user = user;
    next();
}


module.exports = router;