import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
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
                if (credentials) {
                    const userFound = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });

                    if (!userFound) throw new Error("No se encontró el usuario.");

                    const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

                    if (!matchPassword) throw new Error("La contraseña ingresada es incorrecta.");

                    return {
                        id: userFound.id.toString(),
                        name: userFound.name,
                        lastname: userFound.lastname,
                        genreId: userFound.genreId,
                        email: userFound.email,
                    };
                };

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.lastname = user.lastname;
                token.genreId = user.genreId;
                token.email = user.email;
            } else if (token.id) {
                // Este codigo actualiza la sesión si el token ya existe (sirve para modificar los datos del usuario en tiempo real)
                const userUpdated = await prisma.user.findUnique({
                    where: { id: Number(token.id) }
                });
                if (userUpdated) {
                    token.name = userUpdated.name;
                    token.lastname = userUpdated.lastname;
                    token.genreId = userUpdated.genreId;
                    token.email = userUpdated.email;
                };
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };