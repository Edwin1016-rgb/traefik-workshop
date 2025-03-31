// api/server.js
const express = require('express');
const app = express();
const port = 3000;

const serviceId = process.env.SERVICE_ID || 'unknown';

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API!',
    timestamp: new Date().toISOString(),
    serviceId: serviceId
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'UP',
    serviceId: serviceId
  });
});

// Add route to test load
app.get('/load', (req, res) => {
  // Simulate CPU-intensive task
  let result = 0;
  for(let i = 0; i < 1000000; i++) {
    result += Math.random() * Math.random();
  }
  
  res.json({
    message: 'Load test completed',
    result: result,
    serviceId: serviceId
  });
});

app.listen(port, () => {
  console.log(`API server (${serviceId}) listening at http://localhost:${port}`);
});