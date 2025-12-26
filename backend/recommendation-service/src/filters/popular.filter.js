export const popularFilter = (repos) =>
  repos.filter(repo =>
    repo.stars > 500 &&
    repo.activityScore >= 7
  );
