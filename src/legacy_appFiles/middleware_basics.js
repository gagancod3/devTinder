const express = require('express');
const app = express();

// First middleware
app.use((req, res, next) => {
  console.log('Middleware 1: This always runs');
  next();
});

// Second middleware
app.use((req, res, next) => {
  console.log('Middleware 2: This also always runs');
  next();
});

// Route handler
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(7000, () => {
  console.log('Server running on port 8080');
});


/*

Middleware -

In Node.js, middleware refers to functions that execute during the request–response cycle of a server, 
most commonly within Express.js applications. These functions sit between a request received by the 
server and the final response sent to the client, acting as an intermediary that can execute code, modify data, 
or control how the request proceeds.

*/

