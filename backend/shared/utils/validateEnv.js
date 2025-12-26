export const validateEnv = (requiredVars = []) => {
  const missing = requiredVars.filter(v => !process.env[v]);
  if (missing.length) {
    throw new Error(`Missing env vars: ${missing.join(", ")}`);
  }
};
