const swaggerAutogen = require('swagger-autogen');


const doc = {
    info: {
        version: '1.1.0',      // by default: '1.0.0'
        title: 'Contact REST API',        // by default: 'REST API'
        description: 'seed list',  // by default: ''
      },
      host:'linfundcse341.onrender.com',
      schemes: ['https'] 
    };

const outputFile = './swagger.json';
const endpointsFiles = ['./routesCtrl/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
