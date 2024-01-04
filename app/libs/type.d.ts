import { User } from "@prisma/client";
import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session{
        user: User
    }
}

declare module "next-auth/jwt"{
    type JWT = User
}