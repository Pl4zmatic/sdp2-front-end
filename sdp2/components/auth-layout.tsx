"use client"

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Navbar } from "@/components/navbar"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check token in localStorage
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)

    // Geen token --> Login
    if (!token && pathname !== '/Login') {
      router.push('/Login')
    }
    
    // Wel token --> Landing
    if (token && pathname === '/Login') {
      router.push('/Landing')
    }
  }, [pathname, router])

  return (
    <div className="flex min-h-screen">
      {/* Navbar tonen als gebruiker is ingelogd */}
      {isAuthenticated && <Navbar />}

      <div className={`flex-1 ${isAuthenticated ? 'md:ml-64' : ''} transition-all duration-300 ease-in-out`}>
        <main className={`${isAuthenticated ? 'p-8' : 'p-0'} w-full`}>{children}</main>
      </div>
    </div>
  )
} 