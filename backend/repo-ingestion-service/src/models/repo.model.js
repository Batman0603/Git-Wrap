import { db } from "../config/db.js";

export const upsertRepo = async (repo) => {
  const query = `
    INSERT INTO repositories
    (id, name, full_name, description, language, stars, forks, open_issues, last_pushed_at, is_archived)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      stars = VALUES(stars),
      forks = VALUES(forks),
      open_issues = VALUES(open_issues),
      last_pushed_at = VALUES(last_pushed_at),
      is_archived = VALUES(is_archived),
      updated_at = CURRENT_TIMESTAMP
  `;

  const values = [
    repo.id,
    repo.name,
    repo.full_name,
    repo.description,
    repo.language,
    repo.stargazers_count,
    repo.forks_count,
    repo.open_issues_count,
    repo.pushed_at,
    repo.archived
  ];

  await db.query(query, values);
};
