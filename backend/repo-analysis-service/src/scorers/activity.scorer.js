// src/scorers/activity.scorer.js
module.exports = function activityScore(repo) {
  if (!repo.last_commit) return 0;

  const days =
    (Date.now() - new Date(repo.last_commit)) / (1000 * 60 * 60 * 24);

  if (days < 30) return 90;
  if (days < 90) return 70;
  if (days < 180) return 40;
  return 10;
};
