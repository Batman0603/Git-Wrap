// src/models/repoAnalysis.model.js
module.exports = {
  analyze(repo) {
    return {
      repoId: repo.id,
      fullName: repo.full_name,
      language: repo.language,
      scores: {},
      tags: [],
      analyzedAt: new Date()
    };
  }
};
