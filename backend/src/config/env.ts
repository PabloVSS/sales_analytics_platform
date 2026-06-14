export const env = {
  databaseUrl: process.env.DATABASE_URL || "",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "super_secret_key",
};