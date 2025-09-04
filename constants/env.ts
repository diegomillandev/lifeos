const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(
      `Environment variable ${key} is not set and no default value provided.`
    );
  }
  return value;
};

export const MONGODB_URI = getEnv("MONGODB_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const NEXT_PUBLIC_BASE_URL = getEnv("NEXT_PUBLIC_BASE_URL", "http://localhost:3000");