"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton, TabButton } from "./button";
import { useEffect, useState } from "react";
import { useTokens } from "../api/hooks/useTokens";
import { TokenList } from "./TokenList";
import { Swap } from "./Swap";

type Tab = "tokens" | "send" | "add_fund" | "swap" | "withdraw"
const tabs: {id: Tab; name: string}[] = [
    {id:"tokens", name: "Tokens"}, 
    {id:"send", name: "Send"}, 
    {id:"add_fund", name: "Add_fund"}, 
    {id:"swap", name: "Swap"}, 
    {id:"withdraw", name: "Withdraw"} 
];

export const ProfileCard = ({publicKey} : {
    publicKey: string
}) => {
    const session = useSession();
    const router = useRouter();
    const [selectedtab, setSelectedTab] = useState<Tab>("tokens");
    
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
        <div className="max-w-4xl bg-white rounded shadow w-full">
            <Greeting 
                image= {session.data?.user?.image ?? ""} 
                name={session.data?.user?.name ?? ""} />
            
            <div className="w-full flex px-10">
                {tabs.map(tab => <TabButton active = {tab.id === selectedtab} onClick={() => {
                    setSelectedTab(tab.id)
                }}>{tab.name} </TabButton>)}
            </div>
            <div className={`${selectedtab === "tokens" ? "visible": "hidden" }`}> < Assets publicKey="{publicKey}" />: null</div>
            <div className={`${selectedtab === "swap" ? "visible": "hidden" }`}> < Swap publicKey="{publicKey}" />: null</div>
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

    return <div className="text-slate-500 ">
        <div className="mx-12 py-2">
            Account assets
        </div>

        <div className="flex justify-between mx-12" >
            <div className="flex">
                <div className="text-4xl font-bold text-black">
                    ${tokenBalances?.totalBalance ?? "No balance aviable"}
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
        <div className="pt-4 bg-slate-100 p-12 mt-4">  
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
    return <div className="flex p-12">
        <img src={image} className="rounded-full w-16 h-16 mr-4" />
        <div className="text-xl font-bold flex flex-col jusiify-center">
            welcome back, {name}
        </div>
    </div>
}

