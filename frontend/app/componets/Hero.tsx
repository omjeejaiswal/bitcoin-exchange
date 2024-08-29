import { SecondaryButton } from "./button"


export const Hero = () => {
    return <div>
        <div className="text-5xl font-medium">
            <span>
                The Indian Cryptocurrency Revolution
            </span>

            <span className="text-blue-500 pl-4 ">
                Revolution
            </span>
        </div>
        <div className="flex justify-center pt-4 text-2xl text-slate-500">
            Create a frictionless wallet with just a Google Account.
        </div>
        <div className="flex justify-center pt-4 text-2xl text-slate-500">
            Convert your INR into Cryptocurrency
        </div>
        <div className="pt-4 flex justify-center">
            <SecondaryButton onClick= {() => {
                signIn("google");
            }}> Login with Google</SecondaryButton>
        </div>
    </div>
}