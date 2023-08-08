const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle incoming webhook requests
app.post('/webhook', (req, res) => {
  const { verify_token } = req.body  // Process the webhook data here
  console.log('Webhook data:', verify_token);
  res.sendStatus(200);
});

// Serve the React app
app.get('/', (req, res) => {
  res.send("i am doing good")
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
