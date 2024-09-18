
import { getServerSession } from "next-auth";
import { ProfileCard } from "../componets/profileCard";
import db from "@/app/db"
import { authConfig } from "../lib/auth";
import { error } from "console";

async function getUserWallet() {
    const session = await getServerSession(authConfig);

    const userWallet = await db.solWallet.findFirst({
        where: {
            userId: session?.user?.uid
        },
        select: {
            publicKey: true
        }
    }) 
    if(!userWallet) {
        return {
            error: "no wallet found associated to the user"
        }
    }

    return {error: null, userWallet };
}

export default async function Dashboard() {
    const userWallet = await getUserWallet();

    if(userWallet.error || !userWallet.userWallet?.publicKey) {
        return <>No solana wallet found </>
    }

    return <div>
        <ProfileCard publicKey= {userWallet.userWallet?.publicKey} />
    </div>
}
