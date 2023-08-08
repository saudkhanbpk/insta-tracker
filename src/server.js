const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle incoming webhook requests
app.get('/webhook', (req, res) => {
  console.log('Received request:', req.query); // Log the query parameters
  const challenge = req.query['hub.challenge'];
  res.status(200).send(challenge);
});

// Serve the React app
app.get('/', (req, res) => {
  res.send("i am doing good")
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
