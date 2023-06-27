const  mongodb = require('../db/connect');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

//build mongoose requied schema
const seedSchema = new mongoose.Schema({
        seedPacket_id:{type: Number, required:true},
        name: {type: String, required:true},
        cultivar: {type: String, required:false},
        fTemp: {type: String, required:false},
        plantDepth: {type: String, required:false},
        frstHardy: {type: String, required:false},
        hrsSunlight: {type: String, required:false},
        inSpaced: {type: String, required:false},
        dysToSprout: {type: String, required:false},
        category_id: {type: Number, required:true},
        brand_id: {type: Number, required:true}
});
const seedModel = mongoose.model('seed',seedSchema);


const getAllSeeds = async (req,res) => {
    const result = await mongodb.getDb().db('gardenSeeds').collection('seeds').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
}

const getSingleSeed = async (req, res)=> {
    const sid = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('gardenSeeds').collection('seeds').find({_id:sid});
    result.toArray()
    .then((lists)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    })
}

const addNewSeed = async (req, res) => {
    const seed = {
        seedPacket_id:req.body.seedPacket_id,
        name: req.body.name,
        cultivar: req.body.cultivar,
        fTemp: req.body.fTemp,
        plantDepth: req.body.plantDepth,
        frstHardy: req.body.frstHardy,
        hrsSunlight: req.body.hrsSunlight,
        inSpaced: req.body.inSpaced,
        dysToSprout: req.body.dysToSprout,
        category_id: req.body.category_id,
        brand_id: req.body.brand_id
    };
    const response = await mongodb.getDb().db('gardensSeeds').collection('seeds').insertOne(seed);
    if(response.ackowledged) {
        res.status(201).json(response);
        res.send(response._id);
    } else {
        res.status(500).json(response.error || 'Some error occurred while adding the seed.');
    }
}
module.exports = {
    getAllSeeds,
    getSingleSeed,
    addNewSeed,
}