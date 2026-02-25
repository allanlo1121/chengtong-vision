function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }
  return value;
}

export const env = {
  SUPABASE_URL: required("SUPABASE_URL"),
  SUPABASE_SERVICE_KEY: required("SUPABASE_SERVICE_KEY"),
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
