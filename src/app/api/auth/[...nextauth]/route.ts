// import { prisma } from "@/libs/prisma";
// import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { authOptions } from "@/libs/authOptions";
// import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };