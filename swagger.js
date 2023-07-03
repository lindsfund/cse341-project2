const swaggerAutogen = require('swagger-autogen');


const doc = {
    info: {
        version: '1.1.0',      // by default: '1.0.0'
        title: 'Contact REST API',        // by default: 'REST API'
        description: 'seed App',  // by default: ''
      },
      host:'https://cse341-gardenseeds.onrender.com',
      schemes: ['https'] 
    };

const outputFile = './swagger.json';
const endpointsFiles = ['./routesCtrl/users.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
