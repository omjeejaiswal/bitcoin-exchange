import NextAuth from "next-auth/next";
import {authconfig} from "@/app/lib/auth"



const handler = NextAuth(authConfig)

export {handler as GET, handler as POST}

console.log({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
})