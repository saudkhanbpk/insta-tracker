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
  const body = req.body; // Get the request body instead of query parameters
  console.log('Received webhook:', body);
  console.log("second:", body.changes)

  if (body.object === 'page') {
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

// // Handle verification requests
// app.get('/webhook', (req, res) => {
//   const mode = req.query['hub.mode'];
//   const verifyToken = req.query['hub.verify_token'];
//   const challenge = req.query['hub.challenge'];

//   if (mode === 'subscribe' && verifyToken === 'mytoken') {
//     console.log('Verification successful');
//     res.status(200).send(challenge);
//   } else {
//     console.log('Verification failed');
//     res.sendStatus(403);
//   }
// });

// Serve the React app
app.get('/', (req, res) => {
  res.send('i am doing good');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
