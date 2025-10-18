import NextAuth from "next-auth";
import { authOptions } from "@/libs/authOptions";

// Crea el handler de NextAuth
const handler = NextAuth(authOptions);

// Exporta SOLO los métodos HTTP válidos para Next.js
export { handler as GET, handler as POST };
