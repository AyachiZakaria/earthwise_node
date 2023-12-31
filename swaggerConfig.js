const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Your API description',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update this with your server URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Your API routes directory
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
