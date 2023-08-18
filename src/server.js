const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://imrankhan44:FwRIFpX0oMOhHueJ@cluster0.omekinp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log when the MongoDB connection is open
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Log if there's an error connecting to MongoDB
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
const webhookSchema = new mongoose.Schema({
  entry: Array

});

const WebhookData = mongoose.model('WebhookData', webhookSchema);

// Handle incoming webhook requests
app.post('/webhook', (req, res) => {
  const body = req.body;

  console.log('Received webhook:', body);
  console.log('Received webhook11:', body.entry);
  new WebhookData({
    entry: body
  }).save((err) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Error saving data');
    } else {
      console.log('Data saved to MongoDB');
      res.status(200).send('EVENT_RECEIVED');
    }
  });
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
