import Image from "next/image";
import logo from "@/public/logo.jpg"
import AuthForm from "./components/AuthForm"

export default function Home() {
    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#fefefe]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image src={logo} width="70" height="70" alt="logo" className="mx-auto w-auto -my-7" />
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 tracking-tight">
                    <span className="bg-gradient-to-b from-[#6c14c5] to-[#29c6ee] bg-clip-text text-transparent">LogIn to your account!</span>
                </h2>
            </div>
            <AuthForm />
        </div>
    );
}