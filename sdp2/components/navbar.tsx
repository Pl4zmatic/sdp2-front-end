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
import { useAuth } from "@/app/contexts/useAuth";
import { ROLES } from "@/types/roles";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const logout = useLogout();
  const { user } = useAuth();

  // Verbieden scrollen wanneer hamburger menu open is
  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? "hidden" : "auto";
  };

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data } = useSWR<{ unreadCount: number }>(
    user?.id
      ? `http://localhost:4000/api/notifications/user/${user.id}/count`
      : null,
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
        className={`fixed top-0 h-screen w-[17.5rem] flex-col justify-between bg-neutral-100 dark:bg-navy transition-all duration-300 ease-in-out z-50 md:flex md:left-0 ${
          isMenuOpen ? "left-0 flex" : "-left-64 hidden"
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between pt-6 pl-6">
            <a href="Landing">
              <Image
                src="/logo.svg"
                width={120}
                height={40}
                alt="Logo"
                className="w-auto h-auto bg-delawareRed dark:bg-transparent rounded-md px-4 "
              />
            </a>
            <ThemeToggle />
          </div>

          <nav className="space-y-6 px-6">
            {(user.role === ROLES.MANAGER ||
              user.role === ROLES.VERANTWOORDELIJKE ||
              user.role === ROLES.TECHNIEKER) && (
              <Link
                href="/Site"
                className="flex  items-center gap-3 text-black dark:text-white hover:text-delawareRed/80 dark:hover:text-delawareRed/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Compass size={20} className="" />
                <span>Plant Overview</span>
              </Link>
            )}

            {user.role === ROLES.MANAGER && (
              <>
                <Link
                  href="/SiteManagement"
                  className="flex items-center gap-3 text-black dark:text-white hover:text-delawareRed/80 dark:hover:text-delawareRed/80 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart2 size={20} />
                  <span>Plant Management</span>
                </Link>

                <Link
                  href="/Kpi"
                  className="flex items-center gap-3 text-black dark:text-white hover:text-delawareRed/80 dark:hover:text-delawareRed transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ChartNoAxesCombined size={20} />
                  <span>KPI Dashboard</span>
                </Link>
              </>
            )}

            {user.role === ROLES.VERANTWOORDELIJKE && (
              <>
                <Link
                  href="/Employees"
                  className="flex items-center gap-3 text-black dark:text-white hover:text-delawareRed dark:hover:text-delawareRed transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users size={20} />
                  <span>Employees</span>
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-3 text-black dark:text-white hover:text-delawareRed/80 dark:hover:text-delawareRed transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FileText size={20} />
                  <span>Report</span>
                </Link>
              </>
            )}

            {user.role === ROLES.ADMIN && (
              <>
                <Link
                  href="/Employees"
                  className="flex items-center gap-3 text-black dark:text-white hover:text-delawareRed/80 dark:hover:text-delawareRed transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users size={20} />
                  <span>Gebruikersbeheer</span>
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="space-y-4 px-6 pb-6">
          <Link
            href="notifications"
            className="flex items-center gap-3 text-black dark:text-white hover:text-delawareRed/80 dark:hover:text-delawareRed transition-colors cursor-pointer"
          >
            <Bell size={20} />
            <span>Notifications</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-delawareRed text-xs text-white ml-auto">
              {data?.unreadCount}
            </span>
          </Link>

          <div className="relative">
            <div
              className="flex items-center gap-3 text-black dark:text-white hover:text-delawareRed/80 dark:hover:text-delawareRed transition-colors cursor-pointer"
              onClick={toggleProfile}
            >
              <User size={24} />
              <span>
                {user.firstName} {user.lastName}
              </span>
              <ChevronDown
                size={24}
                className={`hover:bg-neutral-200  bg-transparent dark:hover:bg-lightestNavy transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </div>

            {isProfileOpen && (
              <div className="absolute bottom-full mb-2 w-full bg-white dark:bg-slate-800 rounded-md shadow-lg overflow-hidden">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
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
