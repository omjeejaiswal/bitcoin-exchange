"use client";
import { signIn, useSession } from "next-auth/react";
import { SecondaryButton } from "./button"
import { useRouter } from "next/navigation";


export const Hero = () => {
    const session = useSession();
    const router = useRouter();

    return <div>
        <div className="text-5xl font-medium">
            <span>
                The Indian Cryptocurrency Revolution
            </span>

            <span className="text-blue-500 pl-4 ">
                Revolution
            </span>
        </div>
        <div className="flex justify-center pt-4 text-2xl text-slate-500">
            Create a frictionless wallet with just a Google Account.
        </div>
        <div className="flex justify-center pt-4 text-2xl text-slate-500">
            Convert your INR into Cryptocurrency
        </div>
        <div className="pt-8 flex justify-center">
            
            {session.data?.user ? <SecondaryButton onClick= {() => {
                router.push("/dashboard");
            }}> go to dashboard</SecondaryButton> : <SecondaryButton onClick= {() => {
                signIn("google");
            }}> Login with Google</SecondaryButton>}
        </div>
    </div>
}