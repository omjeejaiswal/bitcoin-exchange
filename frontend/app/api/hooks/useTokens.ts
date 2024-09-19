import { TokenDetails } from "@/app/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react"

interface TokenWithBalance extends TokenDetails{
    balance: string,
    usdBalance: string,
}

export function useTokens(address: string) {
    const [tokenBalances, setTokensBalance] = useState<{
        totalBalance: number,
        tokens: TokenWithBalance[]
    } | null > (null);

    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        axios.get(`/api/tokens?address=${address}`)
            .then(res => {
                setTokensBalance(res.data);
                setLoading(false)
            })
    }, [])

    return {
        loading, tokenBalances
    }
}