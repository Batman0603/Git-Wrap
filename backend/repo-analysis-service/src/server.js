// src/server.js
const express = require('express');
const config = require('./config');
const analyzeRepo = require('./services/analysis.service');

const app = express();
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  try {
    const repo = req.body;
    if (!repo || !repo.id) {
      return res.status(400).json({ error: 'Invalid repo payload' });
    }

    const analysis = await analyzeRepo(repo);

    if (!analysis) {
      return res.status(500).json({ error: 'Analysis failed' });
    }

    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(config.port, () => {
  console.log(`Repo Analysis Service running on port ${config.port}`);
});
