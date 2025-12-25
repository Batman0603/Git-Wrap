export function isApiRepo(repo) {
  const keywords = [
    "api", "backend", "server",
    "rest", "graphql", "microservice"
  ];

  const text = `
    ${repo.name}
    ${repo.description || ""}
    ${(repo.topics || []).join(" ")}
  `.toLowerCase();

  return keywords.some(k => text.includes(k));
}