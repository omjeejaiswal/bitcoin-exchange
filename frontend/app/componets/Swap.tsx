"use client";

import { useState } from "react"
import { SUPPORTED_TOKENS, TokenDetails } from "../lib/Tokens";
import { title } from "process";


export function Swap({publicKey} : {
    publicKey: string
}) {
    const [baseAssest, setBaseAssest] = useState(SUPPORTED_TOKENS[0])
    const [quoteAssest, setQuoteAssest] = useState(SUPPORTED_TOKENS[1])
   
   return <div>
        <SwapInputRow onSelect={(assest) => {
            setBaseAssest(assest)
        }} selectedToken = {baseAssest} title={"You pay"} />

        <SwapInputRow onSelect={(assest) => {
            setQuoteAssest(assest)
        }} selectedToken = {quoteAssest} title = {"you receive"} />
    </div>
}

function SwapInputRow({onSelect, selectedToken, title} :{
    onSelect: (asset: TokenDetails) => void
    selectedToken : TokenDetails;
    title: string
} ) {
    return <div className="border flex justify-between p-4">
        <div>
            {title}
            <AssetSelector selectedToken={selectedToken} onSelect ={onSelect} />
        </div>
    </div>
}

function AssetSelector({selectedToken, onSelect}: {
    selectedToken: TokenDetails;
    onSelect: (assest: TokenDetails) => void;
}) {
    return <div>
        <select onChange={(e) => {
            const selectedToken = SUPPORTED_TOKENS.find(x => x.name === e.target.value);
            if(selectedToken) {
                onSelect(selectedToken);
            }

        }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            <option selected> <img src={selectedToken.image} className="w-10 " /> {selectedToken.name} </option>
            {SUPPORTED_TOKENS.filter(x=> x.name !== selectedToken.name).map(token => <option selected> <img src= {token.image}
            className="w-10"/> {token.name}</option> )}
    </select>
    </div>
}
