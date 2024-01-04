import NextAuth from "next-auth/next";
import prisma from "../../../libs/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions, Session, SessionStrategy } from "next-auth";
import  { Adapter }  from "next-auth/adapters";
import {compare} from "bcrypt"
import { JWT } from "next-auth/jwt";
const adapter = PrismaAdapter(prisma)
export const  authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    adapter:  adapter as Adapter,
    providers: [
        CredentialsProvider({
            name: "credentials",
            type: "credentials",
            credentials: {
                email: {lable: "Email", type: "email"},
                password: {label: "Password", type: "password"},

            },
            async authorize(credentials){
                // const user = {id: "user101", username: "wolfie", name: "chhatra rana", email:"chhatra@gmail.com"}
                // return user
                if(!credentials?.email || !credentials?.password){
                    return null
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                })

                if(!user){
                    return null
                }

                const isPasswordValid = await compare(credentials?.password, user?.hashedPassword!)

                if(!isPasswordValid){
                    return null
                }

                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.name, 
                    role: user.role,
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            profile(profile){
                console.log({profile})  
                return {
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    email: profile.email,
                    image: profile.picture,
                    role: profile.role? profile.role : "USER"
                }
            }
        }),
       
    ],
    callbacks:{
        session: ({session,token}:{session: Session, token: JWT}) => {
            // console.log('Session Callbak',{session, token})
            session.user.role = token.role
            return {
                ...session,
                id: token.id,
            }
        },
        jwt:({token, user}) => {
            // console.log('JWT Callbak',{token, user}) 
            const u = user as unknown as any
            if(user){
                return {
                    ...token,
                    id: u.id,
                }
            }
            return token
        },
    },
    
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}