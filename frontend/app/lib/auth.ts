
// import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import db from "@/app/db";
import { Keypair } from "@solana/web3.js";

import { Session } from "next-auth";
import { Session } from "inspector/promises";


export interface session extends Session {
    user: {
        email: string;
        name: string;
        image: string;
        uid: string;
    };
}
// sign up and login
export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
    ],
    callbacks : {
        session



        async signIn({user, account, profile, email, credentials}) {
            if(account?.provider === "google") {
                const email = user.email;
                if(!email) {
                    return false
                }

                console.log({user, account, profile, email, credentials})
                const userDb = await db.user.findFirst({
                    where: {
                        username: email
                    }
                })

                if(userDb) {
                    return true
                }

                const keypair = Keypair.generate();
                const publickey = keypair.publicKey.toBase58();
                const privateKey = keypair.secretKey;
                console.log(publickey);
                console.log(privateKey);


                await db.user.create({
                    data: {
                        username: email,
                        name: profile?.name,
                        // @ts-ignore
                        profilePicture: profile?.picture, 
                        provider: "Google",
                        solWallet: {
                            create: {
                                publicKey: "",
                                privateKey: ""
                            }
                        },
                        inrWallet: {
                            create: {
                                balance: 0
                            }
                        }
                    }
                })
                return true;
            }
            return false
        },
    }
})

export {handler as GET, handler as POST}
























// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google";
// import db from "@/app/db";
// import { Keypair } from "@solana/web3.js";

// // sign up and login
// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
//         }),
//     ],
//     callbacks : {
//         async signIn({user, account, profile, email, credentials}) {
//             if(account?.provider === "google") {
//                 const email = user.email;
//                 if(!email) {
//                     return false
//                 }

//                 console.log({user, account, profile, email, credentials})
//                 const userDb = await db.user.findFirst({
//                     where: {
//                         username: email
//                     }
//                 })

//                 if(userDb) {
//                     return true
//                 }

//                 const keypair = Keypair.generate();
//                 const publickey = keypair.publicKey.toBase58();
//                 const privateKey = keypair.secretKey;
//                 console.log(publickey);
//                 console.log(privateKey);


//                 await db.user.create({
//                     data: {
//                         username: email,
//                         name: profile?.name,
//                         // @ts-ignore
//                         profilePicture: profile?.picture, 
//                         provider: "Google",
//                         solWallet: {
//                             create: {
//                                 publicKey: "",
//                                 privateKey: ""
//                             }
//                         },
//                         inrWallet: {
//                             create: {
//                                 balance: 0
//                             }
//                         }
//                     }
//                 })
//                 return true;
//             }
//             return false
//         },
//     }
// })

// export {handler as GET, handler as POST}





















