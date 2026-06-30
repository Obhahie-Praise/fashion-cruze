import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
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
