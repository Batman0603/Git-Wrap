// src/scorers/overall.scorer.js
module.exports = function overallScore(scores) {
  const { popularity, activity, beginner } = scores;

  return Math.round(
    popularity * 0.4 +
    activity * 0.4 +
    beginner * 0.2
  );
};
