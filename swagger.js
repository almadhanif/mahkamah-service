const options = {
  openapi: '3.0.0', // Enable/Disable OpenAPI.                        By default is null
  language: 'en-US', // Change response language.                      By default is 'en-US'
  disableLogs: false, // Enable/Disable logs.                           By default is false
  autoHeaders: true, // Enable/Disable automatic headers recognition.  By default is true
  autoQuery: true, // Enable/Disable automatic query recognition.    By default is true
  autoBody: true, // Enable/Disable automatic body recognition.     By default is true
  writeOutputFile: true, // Enable/Disable writing the output file.        By default is true
};

// eslint-disable-next-line node/no-unpublished-require
const swaggerAutogen = require('swagger-autogen')(options);

const doc = {
  info: {
    version: '1.0.0',
    title: 'Krakatau Service Express API',
    description: 'Krakatau Service Express API Documentation',
  },
  servers: [
    {
      url: 'http://localhost:5015',
      description: 'Localhost Server',
    },
    // {
    //   url: "https://lmsservice-qa-portaverse.ilcs.co.id",
    //   description: "Development Server",
    // },
    // {
    //   url: "https://lmsservice-qa-portaverse-staging.ilcs.co.id",
    //   description: "Staging Server",
    // },
    // {
    //   url: "https://16ztxj75-5015.asse.devtunnels.ms",
    //   description: "Tunneling Server",
    // },
    // { ... }
  ],
  tags: [
    // by default: empty Array
    {
      name: 'Dashboard', // Tag name
      description: 'Everything about Dashboard', // Tag description
      paths: '/dashboard',
    },
    // {
    //   name: "Vendor Dashboard", // Tag name
    //   description: "Everything about Vendor Dashboard", // Tag description
    //   paths: "/vendor-dashboard",
    // },
    // { ... }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      apiKeyAuth: {
        type: 'apiKey',
        in: 'header', // can be 'header', 'query' or 'cookie'
        name: 'API-KEY',
      },
    },
  }, // by default: empty object
  security: [
    {
      bearerAuth: [],
      apiKeyAuth: [],
    },
    // { ... }
  ],
};

const outputFile = './swagger-output.json';
const routes = ['./app.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
console.log('Firing up swagger...');
swaggerAutogen(outputFile, routes, doc).then(() => {
  // ! Apabila comment dibawah dinyalakan, maka command npm run swagger akan langsung mewakili generate swagger + npm run dev
  // require("./bin/www"); // Your project's root file
});
