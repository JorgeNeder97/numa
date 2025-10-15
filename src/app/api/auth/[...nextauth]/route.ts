// import { prisma } from "@/libs/prisma";
// import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { authOptions } from "@/libs/authOptions";
// import CredentialsProvider from "next-auth/providers/credentials";


export const { handler } = NextAuth(authOptions);

export const { GET, POST } = handler;