const express = require('express');
const routes = express.Router();

const seedsMDL = require('../models/seeds');

//get seed info
routes.get('/', seedsMDL.getAllSeeds);

module.exports = routes;