// src/scorers/beginner.scorer.js
module.exports = function beginnerScore(repo) {
  let score = 0;

  if (repo.has_contributing) score += 40;
  if (repo.good_first_issues > 0) score += 40;
  if ((repo.open_issues || 0) < 20) score += 20;

  return Math.min(score, 100);
};
