export const beginnerFilter = (repos) =>
  repos.filter(repo =>
    repo.complexityScore <= 3 &&
    repo.openIssues < 50 &&
    repo.goodFirstIssues > 0
  );
