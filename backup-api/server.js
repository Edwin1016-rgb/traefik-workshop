// backup-api/server.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the BACKUP API! This is active when main service is under heavy load.',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'Backup API' });
});

app.listen(port, () => {
  console.log(`Backup API server listening at http://localhost:${port}`);
});