import "server-only";

import { betterAuth, generateId } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Pool } from "pg";
import { db } from "./db/drizzle";
import { nextCookies } from "better-auth/next-js";
import { redirect } from "next/navigation";
import { cache } from "react";
import { headers } from "next/headers";
export const auth = betterAuth({
  //...

  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
  advanced: {
    database: { generateId: false },
  },
});

export const requireLogin = cache(async (redirectTo = "/dashboard") => {
  const user = await getCurrentUser()

  if (!user) {
    redirect(`/login?${new URLSearchParams({ redirectTo })}`);
  }

  return user;
});


export const getCurrentUser = cache(async()=>{

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return null
  }

  return session.user;
})