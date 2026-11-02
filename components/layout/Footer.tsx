"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Aperture,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

const XLogo = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z" />
  </svg>
);
const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const socials = [
  { name: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
  { name: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
  { name: "LinkedIn", icon: LinkedInIcon, href: "https://linkedin.com" },
  { name: "X", icon: XLogo, href: "https://x.com" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About Us", href: "/about" },
];

const categories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.add({ title: "Invalid email", description: "Please enter a valid email address.", type: "error" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.add({ title: "Subscribed!", description: "You're on the list. Stay tuned for updates.", type: "success" });
      setEmail("");
      setLoading(false);
    }, 400);
  };

  return (
    <footer className="mt-auto bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white">
                <Aperture size={25} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Studio<span className="text-amber-500">Space</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Empowering creators with inspiring spaces. Discover and book the
              perfect studio for your next creative project.
            </p>
            <div className="flex gap-3 pt-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition hover:bg-amber-500 hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick nav */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-400 transition hover:text-amber-400"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Popular Categories
            </h3>
            <ul className="space-y-2.5">
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(c)}`}
                    className="text-sm text-gray-400 transition hover:text-amber-400"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">
              Stay in the Creative Loop
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe for new studios, tips, and creative inspiration.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="newsletter-email" className="text-xs text-gray-400">
                  Email
                </Label>
                <Input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 text-white hover:bg-amber-600"
              >
                <Mail size={16} className="mr-2" />
                {loading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            © 2026 StudioSpace. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-xs text-gray-500 transition hover:text-amber-400">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs text-gray-500 transition hover:text-amber-400">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}