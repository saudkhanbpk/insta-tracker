const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

mongoose.connect('mongodb://localhost:27017/webhook', { useNewUrlParser: true, useUnifiedTopology: true });
const webhookSchema = new mongoose.Schema({
  object: String,
  changes: Object, // Modify this according to the actual structure
});

const WebhookData = mongoose.model('WebhookData', webhookSchema);

// Handle incoming webhook requests
app.post('/webhook', (req, res) => {
  const body = req.body;

  console.log('Received webhook:', body);
  console.log('Second:', body.changes);

  if (body.object === 'page') {
    // Create a new instance of the WebhookData model
    const newWebhookData = new WebhookData({
      object: body.object,
      changes: body.changes,
    });

    // Save the data to MongoDB
    newWebhookData.save((err) => {
      if (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Error saving data');
      } else {
        console.log('Data saved to MongoDB');
        res.status(200).send('EVENT_RECEIVED');
      }
    });
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
