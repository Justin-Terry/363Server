// Importing http package
const http = require('http');
// Assign port the project will run on
// provided by the server or 3000 as default
const port = process.env.PORT || 8000;
// Import the app
const app = require('./app');

// Create server with listen for app
const server = http.createServer(app)

// Start server and have it listen to port
server.listen(port);