
import { getServerSession } from "next-auth";
import { ProfileCard } from "../componets/profileCard";
import db from "@/app/db"

function getBalance() {
    const session = await getServerSession();

    db.solWallet.findFirst({
        where: {
            userId: session?.uid
        }
    }) 
}

export default async function() {

    return <div>

        <ProfileCard/>
    </div>
}
