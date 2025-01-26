// server.js
const express = require('express');
const app = express();
const client = require('./db');

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a route to test the database connection
app.get('/test', (req, res) => {
  res.send('Backend is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
