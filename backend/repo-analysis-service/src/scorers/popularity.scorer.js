// src/scorers/popularity.scorer.js
module.exports = function popularityScore(repo) {
  const stars = repo.stars || 0;
  const forks = repo.forks || 0;
  const watchers = repo.watchers || 0;

  return Math.min(
    Math.round(stars * 0.5 + forks * 0.3 + watchers * 0.2),
    100
  );
};
