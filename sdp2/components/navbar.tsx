"use client"

import { useState } from "react"
import Link from "next/link"
import { Compass, BarChart2, FileText, Users, Bell, Menu, X, ChartNoAxesCombined } from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Verbieden scrollen wanneer hamburger menu open is
  const toggleMenu = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)
    document.body.style.overflow = newState ? "hidden" : "auto"
  }

  return (
    <>
      {/* Hamburger icoontje */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-delawareRed dark:bg-navy text-white md:hidden"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile navbar */}
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMenu} />}

      {/* Navbar */}
      <aside
        className={`fixed top-0 h-screen w-64 flex-col justify-between bg-delawareRed dark:bg-navy p-6 transition-all duration-300 ease-in-out z-50 md:flex md:left-0 ${
          isMenuOpen ? "left-0 flex" : "-left-64 hidden"
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <a href="Landing"><Image src="/logo.svg" width={120} height={40} alt="Logo" className="w-auto h-auto" /></a>
            <ThemeToggle />
          </div>

          <nav className="space-y-6">
            <Link
              href="/Site"
              className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Compass size={20} />
              <span>Plant Overview</span>
            </Link>

            <Link
              href="PlantDetails"
              className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart2 size={20} />
              <span>Plant Details</span>
            </Link>

            <Link
              href="#"
              className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText size={20} />
              <span>Quality Registration</span>
            </Link>

            <Link
              href="#"
              className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Users size={20} />
              <span>Employees</span>
            </Link>

            <Link
              href="/Kpi"
              className="flex items-center gap-3 text-white hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <ChartNoAxesCombined size={20} />
              <span>Key Performance Indicators</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 text-white hover:text-white/80 transition-colors cursor-pointer">
          <Bell size={20} />
          <span>Notifications</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-delawareRed">3</span>
        </div>
      </aside>
    </>
  )
}

