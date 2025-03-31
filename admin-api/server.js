// admin-api/server.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/admin', (req, res) => {
  res.json({
    message: 'Welcome to the Admin API!',
    timestamp: new Date().toISOString(),
    access: 'restricted'
  });
});

app.get('/admin/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Admin User', role: 'admin' },
      { id: 2, name: 'Test User', role: 'user' }
    ]
  });
});

app.get('/admin/health', (req, res) => {
  res.json({ status: 'UP', service: 'Admin API' });
});

app.listen(port, () => {
  console.log(`Admin API server listening at http://localhost:${port}`);
});