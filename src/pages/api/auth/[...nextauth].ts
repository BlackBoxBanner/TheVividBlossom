import NextAuth, {
  Awaitable,
  NextAuthOptions,
  RequestInternal,
  User,
} from "next-auth";
import prisma from "@/lib/prisma";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {compare, hash} from "bcrypt";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";


import {NextApiRequest, NextApiResponse} from "next";

export const authOptions: NextAuthOptions = {
    // pages: {
    // 	signIn: "/auth/login",
    // },
    adapter: PrismaAdapter(prisma),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID || "",
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      }),
      CredentialsProvider({
        type: "credentials",
        name: "email and password",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "panic@thedis.co",
          },
          password: {
            label: "Password",
            type: "password",
          },
        },
        // @ts-ignore
        async authorize(credentials, _) {
          const {email, password, type = "user", usernames} = credentials as {
            email: string;
            password: string;
            usernames: string;
            type: "user" | "admin";
          };

          if (type == "user") {
            console.log({email, password, type})
            if (!email || !password) {
              throw new Error("Missing email or password");
            }
            const user = await prisma.user.findUnique({
              where: {
                email,
              },
            });

            if (!user) {
              throw new Error(JSON.stringify({name: "email", message: "Invalid user"}));
            }

            if (user?.password) {
              if (!(user && (await compare(password, user.password)))) {
                // if user doesn't exist or password doesn't match
                throw new Error(JSON.stringify({name: "password", message: "Invalid password"}));
              }
            }

            const userLogin = await prisma.user.update({
              where: {
                id: user.id
              },
              data: {
                last_login: new Date()
              }
            })

            return userLogin;
          } else {
            if (!usernames) {
              throw new Error(JSON.stringify({username: "Missing username"}));
            }
            if (!password) {
              throw new Error(JSON.stringify({password: "Missing password"}));
            }
            console.log(usernames, password)
            const user = await prisma.admin_User.findUnique({
              where: {
                usernames
              }
            });

            if (!user) {
              throw new Error(JSON.stringify({username: "User not found"}));
            }

            if (user?.password) {
              if (!(user && (await compare(password, user.password)))) {
                // if user doesn't exist or password doesn't match
                throw new Error(JSON.stringify({password: "Invalid username or password"}));
              }
            }
            const admin = await prisma.admin_User.update({
              where: {
                usernames: user.usernames
              },
              data: {
                last_login: new Date()
              }
            })
            console.log(admin)
            return admin;
          }
        },
      }),
    ],
    callbacks: {},
    session: {strategy: "jwt"},
    secret: process.env.NEXTAUTH_SECRET
  }
;

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, authOptions);
}
