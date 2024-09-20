import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import z from "zod";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "xyz@gmail.com",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials:Record<"email" | "password", string> |undefined) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        try {
          // Find existing user in the database
          const existingUser = await db.user.findFirst({
            where: { email },
          });

          if (existingUser) {
            // Validate password
            const isValidPassword = await bcrypt.compare(
              password,
              existingUser.password
            );
            if (isValidPassword) {
              // Return valid user object
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.email,
              };
            }
            return null; // Invalid password
          } else {
            // Create new user if not found
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await db.user.create({
              data: { email:email, password: hashedPassword },
            });

            return {
              id: newUser.id.toString(),
              name: newUser.name,
              email: newUser.email,
            };
          }
        } catch (error) {
          console.error("Error during user authorization:", error);
          return null; // Return null in case of error
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async session({ token, session }:any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
