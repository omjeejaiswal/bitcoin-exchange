"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./button";
import { useEffect, useState } from "react";
import { useTokens } from "../api/hooks/useTokens";
import { TokenList } from "./TokenList";


export const ProfileCard = ({publicKey} : {publicKey: string}) => {
    const session = useSession();
    const router = useRouter();
    
    // Loading state for session
    if(session.status == "loading") {
        // ToDo: replace with a skeleton
        return <div>
            Loading...
        </div>
    }

    // if no user session is found, redirect to home
    if(!session.data?.user) {
        router.push("/")
        return null
    }

    return <div className="pt-8 flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow w-full p-12 mx-auto">
            <Greeting 
                image= {session.data?.user?.image ?? ""} 
                name={session.data?.user?.name ?? ""} />

            <Assets publicKey={publicKey} />

        </div>
    </div>

}

function Assets({publicKey}: { publicKey: string }) {
    const [copied, setCopied] = useState(false);
    const {tokenBalances, loading} = useTokens(publicKey);

    useEffect(() => {
        if(copied) {
            let timeout = setTimeout(() => {
                setCopied(false)
            }, 3000)
            return() => {
                clearTimeout(timeout);
            }
        }
    }, [copied])

    if(loading) {
        return "Loading..."
    }

    return <div className="text-slate-500 mt-4">
        Account assets
        <br />

        <div className="flex justify-between">
            <div className="flex">
                <div className="text-4xl font-bold text-black">
                    ${tokenBalances?.totalBalance.toFixed(2) ?? "No balance aviable"}
                </div>

                <div className="font-slate-500 font-bold text-3xl flex flex-col justify-end pb-2 pl-2">
                    USD
                </div>
            </div>

            <div>
                <PrimaryButton onClick={() => {
                    navigator.clipboard.writeText(publicKey)
                    setCopied(true)
                }}>{copied ? "Copied" : "Your wallet address"}
                </PrimaryButton>
            </div>
        </div>
        <div>
            {/* {JSON.stringify(tokenBalances?.tokens)} */}
            <TokenList tokens={tokenBalances?.tokens || []}/>
        </div>
    </div>
}



function Greeting({
    image, name
} : {
    image: string, name:string
}) {
    return <div className="flex">
        <img src={image} className="rounded-full w-16 h-16 mr-4" />
        <div className="text-xl font-bold flex flex-col jusiify-center">
            welcome back, {name}
        </div>
    </div>
}

