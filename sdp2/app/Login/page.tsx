"use client";

import LoginForm from "./components/LoginForm";
import Image from "next/image";
import { useAuth } from "@/app/contexts/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const quickLogin = async (email: string, password: string) => {
    const success = await login({ EMAIL: email, PASSWORD: password });
    if (success) {
      router.push("/Landing");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-[#171b2d] p-0 m-0 overflow-hidden transition-colors duration-300">
      <div className="w-full max-w-md space-y-8 p-8 rounded-lg border border-gray-100 dark:border-[#252a43] bg-neutral-100 dark:bg-[#1a1e33] shadow-sm dark:shadow-lg">
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <Image
              src="/logo.svg"
              alt="Delaware Logo"
              width={240}
              height={48}
              priority
              className="hidden dark:block"
            />
            <Image
              src="/delawareLight.svg"
              alt="Delaware Logo"
              width={240}
              height={48}
              priority
              className="block dark:hidden"
            />
          </div>
          <p className="mt-2 text-xl font-medium">
            <span className="text-[#EF463C]">Shopfloor</span>{" "}
            <span className="text-gray-800 dark:text-white">Application</span>
          </p>
        </div>

        {/* Snelle login buttons (MOET weg voor indienen)*/}
        <div className="grid grid-cols-1 gap-2 p-4 rounded-md">
          <Button
            variant="outline"
            onClick={() => quickLogin("admin@mail.com", "admin")}
            className="bg-white hover:bg-gray-100 text-gray-800 dark:bg-[#252a43] dark:text-white dark:hover:bg-[#2a304d] transition-colors"
          >
            Login as Administrator
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              quickLogin("Verantwoordelijke@mail.com", "Verantwoordelijke")
            }
            className="bg-white hover:bg-gray-100 text-gray-800 dark:bg-[#252a43] dark:text-white dark:hover:bg-[#2a304d] transition-colors"
          >
            Login as Verantwoordelijke
          </Button>
          <Button
            variant="outline"
            onClick={() => quickLogin("manager@mail.com", "manager")}
            className="bg-white hover:bg-gray-100 text-gray-800 dark:bg-[#252a43] dark:text-white dark:hover:bg-[#2a304d] transition-colors"
          >
            Login as Manager
          </Button>
          <Button
            variant="outline"
            onClick={() => quickLogin("Technieker@mail.com", "Technieker")}
            className="bg-white hover:bg-gray-100 text-gray-800 dark:bg-[#252a43] dark:text-white dark:hover:bg-[#2a304d] transition-colors"
          >
            Login as Technieker
          </Button>
        </div>

        <div className="pt-4">
          <LoginForm />
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Delaware. All rights reserved.
      </div>
    </div>
  );
}
