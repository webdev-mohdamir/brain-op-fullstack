export const PORT = process.env.PORT || 5000;
export const DB_URL =
  process.env.DB_URL || "mongodb://localhost:27017/brain-op";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const dbSecretFields = ["__v", "password"];
