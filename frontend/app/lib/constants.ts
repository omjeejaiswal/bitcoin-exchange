import { Connection } from "@solana/web3.js"

export const SUPPORTED_TOKENS: {
    name: string,
    mint: string,
}[] = [{
    name: "USDC",
    mint: "FSxJ85FXVsXSr51SeWf9ciJWTcRnqKFSmBgRDeL3KyWw",
}, {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
}]

export const connection = new Connection("https://api.mainnet-beta.solana.com");

export function