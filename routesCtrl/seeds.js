const express = require('express');
const routes = express.Router();

const seedsMDL = require('../models/seeds');

//GET seed info
routes.get('/', seedsMDL.getAllSeeds);
routes.get('/:id', seedsMDL.getSingleSeed);

//POST new seed
routes.post('/', seedsMDL.addNewSeed);

module.exports = routes;