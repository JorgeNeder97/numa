import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            lastname: string;
            email: string;
        };
    };

    interface User {
        id: string;
        name: string;
        lastname: string;
        email: string;
    };
};

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        lastname: string;
        email: string;
    };
};