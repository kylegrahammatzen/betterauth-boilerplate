import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/db";
import { schema } from "./db/schema";
import { organization } from "better-auth/plugins";
import { nanoid } from "nanoid";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const orgs = await db
            .insert(schema.organization)
            .values({
              id: user.id,
              name: "Personal",
              slug: user.id,
              logo: null,
              createdAt: new Date(),

              metadata: null,
            })
            .returning();
          const org = orgs[0];
          await db.insert(schema.member).values({
            id: nanoid(),
            userId: user.id,
            organizationId: org.id,
            email: user.email,
            role: "owner",
            createdAt: new Date(),
          });
        },
      },
    },
  },
  plugins: [
    organization({
      async sendInvitationEmail(data) {
        console.log("Invitation email sent to", data.email);
      },
    }),
  ],
});
