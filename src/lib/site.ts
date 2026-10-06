export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://www.akazsportshub.com")
).replace(/\/$/, "");
