"use client"

import LoginForm from "./components/LoginForm"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy p-0 m-0 overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-6 border-0 shadow-none">
        <div className="flex flex-col items-center">
          <Image src="/logo.svg" alt="Delaware Logo" width={240} height={48} priority />
          <p className="mt-2 text-xl">
            <span className="text-[#ff5a4f]">Shopfloor</span> <span className="text-white">Application</span>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
