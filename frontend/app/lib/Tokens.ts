
export interface TokenDetails{
    name: string;
    mint: string;
    native: boolean;
    price: string;
    image: string;
}

export const SUPPORTED_TOKENS: TokenDetails[] = [ 
    {
        name: "SOL",
        mint: "So11111111111111111111111111111111111111112",
        native: true,
        price: "180",
        image: "https://cdn3d.iconscout.com/3d/premium/thumb/solana-3d-icon-download-in-png-blend-fbx-gltf-file-formats--cryptocurrency-coin-digital-crypto-coins-pack-science-technology-icons-4759536.png?f=webp"
    }, {
        name: "USDC",
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        native: false,
        price: "1",
        image: "https://cdn3d.iconscout.com/3d/premium/thumb/usdc-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bitcoin-logo-coin-cryptocurrency-symbol-crypto-coins-vol2-pack-science-technology-icons-7947905.png?f=webp"
        
    }, {
        name: "USDT",
        mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        native: false,
        price: "1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjim1Q-Qzy3vQd1BqhcAgf79GUgfQoRbTgyA&s"
}]

