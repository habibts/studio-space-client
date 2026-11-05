"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import UserProfileDropdown from "@/components/shared/UserProfileDropdown";
import {
  Menu,
  X,
  Aperture,
  Sun,
  Moon,
  UserRound,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, isPending } = useCurrentUser();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
  ];
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-200/60 bg-white/90 backdrop-blur-xl shadow-sm dark:border-amber-900/40 dark:bg-gray-950/90">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F59E0B] text-white">
            <Aperture size={25} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Studio<span className="text-[#F59E0B]">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href === "/studios"
                ? pathname === "/studios" || pathname.startsWith("/studios/")
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "rounded-full bg-amber-100 px-3 py-1.5 font-semibold text-[#F59E0B] dark:bg-amber-900/40 dark:text-amber-300"
                    : "text-gray-600 hover:text-[#F59E0B] dark:text-gray-300 dark:hover:text-amber-300"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isPending ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          ) : user ? (
            <UserProfileDropdown user={user} />
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-[#F59E0B] hover:text-[#F59E0B] dark:border-gray-700 dark:text-gray-200"
              >
                <UserRound size={17} />
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#F59E0B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D97706]"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-gray-950 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-gray-700 transition hover:text-[#F59E0B] dark:text-gray-300"
              >
                {link.name}
              </Link>
            ))}

            <div className="my-2 border-t border-gray-200 dark:border-gray-800" />

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>

            </div>

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-gray-300 py-2.5 text-center text-sm font-semibold text-gray-700 dark:border-gray-700 dark:text-white"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-[#F59E0B] py-2.5 text-center text-sm font-semibold text-white hover:bg-[#D97706]"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}