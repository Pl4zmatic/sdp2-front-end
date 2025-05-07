"use client";
import useSWR from "swr";
import { Fetcher } from "swr";
import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  BarChart2,
  FileText,
  Users,
  Bell,
  Menu,
  X,
  BarChartIcon as ChartNoAxesCombined,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { useLogout } from "@/hooks/useLogout";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const logout = useLogout();

  // Verbieden scrollen wanneer hamburger menu open is
  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? "hidden" : "auto";
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<{ unreadCount: number }>(
    `http://localhost:4000/api/notifications/user/3/count`, // Update the endpoint to match the new route
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    },
  );

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
  };

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
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Navbar */}
      <aside
        className={`fixed top-0 h-screen w-64 flex-col justify-between bg-delawareRed dark:bg-navy p-6 transition-all duration-300 ease-in-out z-50 md:flex md:left-0 ${
          isMenuOpen ? "left-0 flex" : "-left-64 hidden"
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <a href="Landing">
              <Image
                src="/logo.svg"
                width={120}
                height={40}
                alt="Logo"
                className="w-auto h-auto"
              />
            </a>
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
              href="/SiteManagement"
              className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <BarChart2 size={20} />
              <span>Plant Management</span>
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
              href="/Employees"
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

        <div className="space-y-4">
          <Link
            href="notifications"
            className="flex items-center gap-3 text-white hover:text-white/80 transition-colors cursor-pointer"
          >
            <Bell size={20} />
            <span>Notifications</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-delawareRed ml-auto">
              {data?.unreadCount}
            </span>
          </Link>

          <div className="relative">
            <div
              className="flex items-center gap-3 text-white hover:text-white/80 transition-colors cursor-pointer"
              onClick={toggleProfile}
            >
              <User size={20} />
              <span>John Doe</span>
              <ChevronDown
                size={16}
                className={`ml-auto transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </div>

            {isProfileOpen && (
              <div className="absolute bottom-full mb-2 w-full bg-white dark:bg-slate-800 rounded-md shadow-lg overflow-hidden">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    john.doe@example.com
                  </p>
                </div>
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
