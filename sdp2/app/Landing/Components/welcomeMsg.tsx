"use client"

import Link from "next/link"
import { Compass, BarChart2, FileText, Users } from "lucide-react"
import { useAuth } from "@/app/contexts/useAuth"
import { ROLES } from "@/types/roles"

interface WelcomeProps {
  name: string
}

export function Welcome({ name }: WelcomeProps) {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
      <h1 className="text-7xl font-bold text-darkGray dark:text-white mb-4">Welcome</h1>
      <p className="text-6xl font-bold text-delawareRed mb-8">{name}</p>

      <div className="flex gap-4 bg-delawareRed dark:bg-blueTransparant px-4 py-2 rounded-lg">
        {(user.role === ROLES.MANAGER || user.role === ROLES.VERANTWOORDELIJKE || user.role === ROLES.TECHNIEKER) && (
          <Link href="/Site" title="Plant Overview">
            <Compass
              size={24}
              className="text-white dark:text-gray-400 hover:text-darkGray dark:hover:text-delawareRed transition-colors cursor-pointer"
            />
          </Link>
        )}

        {user.role === ROLES.MANAGER && (
          <Link href="/Kpi" title="KPI Dashboard">
            <BarChart2
              size={24}
              className="text-white dark:text-gray-400 hover:text-darkGray dark:hover:text-delawareRed transition-colors cursor-pointer"
            />
          </Link>
        )}

        {user.role === ROLES.VERANTWOORDELIJKE && (
          <Link href="/" title="Rapporten">
            <FileText
              size={24}
              className="text-white dark:text-gray-400 hover:text-darkGray dark:hover:text-delawareRed transition-colors cursor-pointer"
            />
          </Link>
        )}

        {(user.role === ROLES.ADMIN || user.role === ROLES.VERANTWOORDELIJKE) && (
          <Link href="/Employees" title="Gebruikers of medewerkers">
            <Users
              size={24}
              className="text-white dark:text-gray-400 hover:text-darkGray dark:hover:text-delawareRed transition-colors cursor-pointer"
            />
          </Link>
        )}
      </div>
    </div>
  )
}
