import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { admin } from "better-auth/plugins";
import { env } from "@/lib/env";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: user.role || "customer"
            }
          }
        }
      }
    }
  },
  user: {
    additionalFields: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      displayName: { type: "string" },
      phoneNumber: { type: "string" },
      avatar: { type: "string" },
      accountStatus: { type: "string" },
      authenticationStatus: { type: "string" },
      emailVerificationStatus: { type: "string" },
    },
  },
  plugins: [
    admin()
  ],
});
