"use client";

import { useSession } from "next-auth/react"


export default function() {
    const session = useSession();

    return <div className="pt-8 flex justify-center">
        <div className="max-w-4xl bg-white rounded shadow w-full p-12">
            hi there
        </div>
    </div>

}


