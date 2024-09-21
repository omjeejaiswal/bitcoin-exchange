"use client";

import { useState } from "react"
import { SUPPORTED_TOKENS, TokenDetails } from "../lib/Tokens";

export function Swap({publicKey} : {
    publicKey: string
}) {
    const [baseAssest, setBaseAssest] = useState(SUPPORTED_TOKENS[0])
    const [quoteAssest, setQuoteAssest] = useState(SUPPORTED_TOKENS[1])
   
   return <div>
    <div className="text-2xl font-bold pb-4">
        Swap Tokens
    </div>
        <SwapInputRow onSelect={(assest) => {
            setBaseAssest(assest)
        }} selectedToken = {baseAssest} title={"You pay"} topBorderEnabled = {true} bottomBorderEnabled={false} />

        <div className="flex justify-center">
            <div onClick={() => {
                let baseAssesTemp = baseAssest;
                setBaseAssest(quoteAssest)
                setQuoteAssest(baseAssesTemp);
            }} className="cursor-pointer rounded-full w-10 h-10 border absolute mt-[-20px] bg-white flex justify-center pt-2">
            <SwapIcon />

            </div>
        </div>

        <SwapInputRow onSelect={(assest) => {
            setQuoteAssest(assest)
        }} selectedToken = {quoteAssest} title = {"you receive"} topBorderEnabled = {false} bottomBorderEnabled={true} />
    </div>
}

function SwapInputRow({onSelect, selectedToken, title, subtitle, topBorderEnabled, bottomBorderEnabled} :{
    onSelect: (asset: TokenDetails) => void
    selectedToken : TokenDetails;
    title: string;
    subtitle?: string;
    topBorderEnabled: boolean;
    bottomBorderEnabled: boolean;
} ) {
    return <div className={`border flex justify-between p-4 ${topBorderEnabled ? "rounded-xl" : "" } ${bottomBorderEnabled ? "rounded-t-xl" : ""} `}>
        <div>
            {title}
            <AssetSelector selectedToken={selectedToken} onSelect ={onSelect} />
            {subtitle}
        </div>
    </div>
}

function AssetSelector({selectedToken, onSelect}: {
    selectedToken: TokenDetails;
    onSelect: (assest: TokenDetails) => void;
}) {
    return <div>
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