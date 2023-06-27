const express = require('express');
const routes = express.Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

routes.use('/', swaggerUI.serve);
routes.get('/', swaggerUI.setup(swaggerDocument));

module.exports = routes;