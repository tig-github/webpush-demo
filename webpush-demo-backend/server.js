/*
demo made with this tutorial https://dev.to/wteja/how-to-make-push-notification-using-nodejs-and-service-worker-jaa
*/
const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors");


// Create express app.
const app = express();
app.use(cors());


// test routes
app.get('/', (req, res) => {
  res.send('Hello from our server!');
  console.log("Hello World!");
})

app.get("/test", (req, res) => {
  console.log("Testing Routing!");
  res.status(201).json({message: "Routing is working!"});
})


// webpush
// Use body parser which we will use to parse request body that sending from client.
app.use(bodyParser.json());

// We will store our client files in ./client directory.
app.use(express.static(path.join(__dirname, "client")))

const publicVapidKey = "BOd2EQ8LTe3KAgMX9lWwTlHTRzv1Iantw50Mw6pUnsNr3pcxl8iglUs-YlQEQLo4UbJk9oyXs_BxgyAe0TCqKME";

const privateVapidKey = "4AoSsRHFaHv0Fupd2NRtrungJF2jkqgccTu-WEc781w";

// Setup the public and private VAPID keys to web-push library.
webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

// Route to send notification to user
app.post('/notification', (req, res) => {
  console.log("Pushing Notifications to User");
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: "Webpush Demo", body: "Here is an example of a push notification" });
  webpush.sendNotification(subscription, payload).catch(console.log);
})

const PORT = 5001;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
