"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export const ProfileCard = () => {
    const session = useSession();
    const router = useRouter();
    

    if(session.status == "loading") {
        // ToDo: replace with a skeleton
        return <div>
            Loading...
        </div>
    }

    if(!session.data?.user) {
        router.push("/")
        return null
    }

    return <div className="pt-8 flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow w-full p-12">
            <Greeting 
                image= {session.data?.user?.image ?? ""} 
                name={session.data?.user?.name ?? ""} />

            <Assets />

        </div>

    </div>

}

function Assets() {
    return <div className="text-slate-500 mt-4">
        Account assets
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

