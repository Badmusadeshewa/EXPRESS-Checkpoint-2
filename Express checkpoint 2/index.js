const express = require('express');
const app = express();

// Custom middleware to verify the time of the request
const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  // Check if it's a weekday (Monday to Friday) and time is between 9 and 17
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue to the next middleware/route handler
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Middleware to serve static files (CSS)
app.use(express.static('public'));

// Middleware to verify working hours for all routes
app.use(checkWorkingHours);

// Route handlers
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/');
});

app.get('/ourservices.html', (req, res) => {
  res.sendFile(__dirname + '/ourservices.html');
});

app.get('/contactus.html', (req, res) => {
  res.sendFile(__dirname + '/contactus.html');
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});