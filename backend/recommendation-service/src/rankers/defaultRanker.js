export const defaultRanker = (repos) => {
  return repos.sort((a, b) => {
    const scoreA =
      a.activityScore * 0.4 +
      a.communityScore * 0.3 +
      a.qualityScore * 0.3;

    const scoreB =
      b.activityScore * 0.4 +
      b.communityScore * 0.3 +
      b.qualityScore * 0.3;

    return scoreB - scoreA;
  });
};
