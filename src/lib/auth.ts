import { betterAuth } from "better-auth";
import { createClient } from "@libsql/client";

// Initialize LibSQL database client
const db = createClient({
  url: process.env.DATABASE_URL || "file:bazardor_local.db"
});

export const auth = betterAuth({
  database: {
    db: db,
    type: "sqlite"
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-google-client-id.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-google-secret"
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "demo-github-client-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "demo-github-secret"
    }
  },
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "bazardor-secret-key-assignment-07-2026-auth"
});
