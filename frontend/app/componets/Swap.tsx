"use client";

import { ReactNode, useEffect, useState } from "react"
import { SUPPORTED_TOKENS, TokenDetails } from "../lib/Tokens";
import { TokenWithBalance } from "../api/hooks/useTokens";
import { PrimaryButton } from "./button";
import axios from "axios";

export function Swap({publicKey, tokenBalances} : {
    publicKey: string;
    tokenBalances: {
        totalBalance: number,
        tokens: TokenWithBalance[]
    } | null;
}) {
    const [baseAssest, setBaseAssest] = useState(SUPPORTED_TOKENS[0])
    const [quoteAssest, setQuoteAssest] = useState(SUPPORTED_TOKENS[1])
    const [baseAmount, setBaseAmount] = useState<string>();
    const [quoteAmount, setQuoteAmount] = useState<string>();
    const [fetchingQuote, setFetchingQuote] = useState(false);

    // TODO: use async useEffect that u can cancel
    // use deboucing
    useEffect(() => {
        if(!baseAmount) {
            return;
        }
        setFetchingQuote(true);
        axios.get(`https://quote-api.jup.ag/v6/quote?inputMint=${baseAssest.mint}&outputMint={quoteAssest.mint}&amount=${Number(baseAmount)*(10**baseAssest.decimals)}&slippageBps=50`)
            .then(res => {
                setQuoteAmount((Number(res.data.outAmount) / Number(10 ** quoteAssest.decimals)).toString())
                setFetchingQuote(false);
            })
    }, [baseAssest, quoteAssest, baseAmount])

   return <div className="p-12 bg-slate-50">
    <div className="text-2xl font-bold pb-4">
        Swap Tokens
    </div>
        <SwapInputRow 
            amount={baseAmount} 
            onAmountChange = {(value: string) => {
                setBaseAmount(value);
            }}
            onSelect={(assest) => {
                setBaseAssest(assest)
            }} 
            selectedToken = {baseAssest} 
            title={"You pay: "} 
            topBorderEnabled = {true} 
            bottomBorderEnabled={false}
            subtitle= { <div className="text-slate-500 pt-1 text-sm pl-1 flex">
                <div className="font-normal pr-1 "> 
                    Current Balance: 
                </div> 
                <div className="font-semibold"> 
                    {tokenBalances?.tokens.find(x => x.name === baseAssest.name)?.balance} {baseAssest.name} 
                </div> 
            </div>}  
        />

        <div className="flex justify-center">
            <div onClick={() => {
                let baseAssesTemp = baseAssest;
                setBaseAssest(quoteAssest)
                setQuoteAssest(baseAssesTemp);
            }} className="cursor-pointer rounded-full w-10 h-10 border absolute mt-[-20px] bg-white flex justify-center pt-2">
            <SwapIcon />

            </div>
        </div>

        <SwapInputRow inputLoading = {fetchingQuote} inputDisabled = {true} amount={quoteAmount} onSelect={(assest) => {
            setQuoteAssest(assest)
        }} selectedToken = {quoteAssest} title = {"you receive: "} topBorderEnabled = {false} bottomBorderEnabled={true} />
    
        <div className="flex justify-end pt-4 ">
        <PrimaryButton onClick={() => {

        }}>Swap 
        </PrimaryButton>
        </div>
    </div>
}

function SwapInputRow({onSelect, amount, onAmountChange ,selectedToken, title, subtitle, topBorderEnabled, bottomBorderEnabled, inputDisabled, inputLoading} :{
    onSelect: (asset: TokenDetails) => void
    selectedToken : TokenDetails;
    title: string;
    subtitle?: ReactNode;
    topBorderEnabled: boolean;
    bottomBorderEnabled: boolean;
    amount?: string;
    onAmountChange?: (value: string) => void;
    inputDisabled?: boolean; 
    inputLoading?: boolean;
}) {
    return <div className={`border flex justify-between p-6 ${topBorderEnabled ? "rounded-xl" : "" } ${bottomBorderEnabled ? "rounded-t-xl" : ""} `}>
        <div>
            <div className="text-xs font-semibold md-1">
                {title}
            </div>
            <AssetSelector selectedToken={selectedToken} onSelect ={onSelect} />
            {subtitle}
        </div>
        <div>
            <input  disabled={inputDisabled} onChange={(e) => {
                onAmountChange?.(e.target.value);
            }} placeholder="0" type="text" className="bg-slate-50 p-6 outline-none text-4xl" dir="rtl" value={ inputLoading ?"Loading...." : amount} ></input>
        </div>
    </div>
}

function AssetSelector({selectedToken, onSelect}: {
    selectedToken: TokenDetails;
    onSelect: (assest: TokenDetails) => void;
}) {
    return <div className="w-24">
        {/* {JSON.stringify(selectedToken)} */}
        <select onChange={(e) => {
            const selectedToken = SUPPORTED_TOKENS.find(x => x.name === e.target.value);
            if(selectedToken) {
                onSelect(selectedToken);
            }

        }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            {/* <option selected> {selectedToken.name} </option> */}
            {SUPPORTED_TOKENS.map(token => <option selected = {selectedToken.name == token.name} > 
                {token.name}
            </option> )}
        </select>
    </div>
}


function SwapIcon() {
    return <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
            </svg>
    </div>
}