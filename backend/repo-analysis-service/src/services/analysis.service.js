// src/services/analysis.service.js
const popularityScore = require('../scorers/popularity.scorer');
const activityScore = require('../scorers/activity.scorer');
const beginnerScore = require('../scorers/beginner.scorer');
const overallScore = require('../scorers/overall.scorer');
const RepoAnalysis = require('../models/repoAnalysis.model');

module.exports = async function analyzeRepo(repo) {
  try {
    const analysis = RepoAnalysis.analyze(repo);

    analysis.scores.popularity = popularityScore(repo);
    analysis.scores.activity = activityScore(repo);
    analysis.scores.beginner = beginnerScore(repo);

    analysis.overall_score = overallScore(analysis.scores);

    // tags
    if (analysis.scores.beginner >= 70) analysis.tags.push('beginner-friendly');
    if (analysis.scores.activity >= 70) analysis.tags.push('active');
    if (analysis.scores.popularity >= 70) analysis.tags.push('popular');

    return analysis;
  } catch (err) {
    console.error('Repo analysis failed:', err.message);
    return null; // fault tolerant, doesn’t crash pipeline
  }
};
