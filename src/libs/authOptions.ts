import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const userFound = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!userFound) throw new Error("No se encontró el usuario.");
        const match = await bcrypt.compare(credentials.password, userFound.password);
        if (!match) throw new Error("Contraseña incorrecta.");

        return {
          id: userFound.id.toString(),
          name: userFound.name,
          lastname: userFound.lastname,
          genreId: userFound.genreId,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.lastname = user.lastname;
        token.genreId = user.genreId;
        token.email = user.email;
      } else if (token.id) {
        const userUpdated = await prisma.user.findUnique({
          where: { id: Number(token.id) },
        });
        if (userUpdated) {
          token.name = userUpdated.name;
          token.lastname = userUpdated.lastname;
          token.genreId = userUpdated.genreId;
          token.email = userUpdated.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.lastname = token.lastname;
        session.user.genreId = token.genreId;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
