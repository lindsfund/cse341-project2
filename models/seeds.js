const  mongodb = require('../db/connect');
const bodyParser = require('body-parser');


const getAllSeeds = async (req,res) => {
    const result = await mongodb.getDb().db().collection('seeds').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
}

module.exports = {
    getAllSeeds,
}