"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Puzzle } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patterns", label: "Pattern Library", icon: Puzzle },
] as const;

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-border bg-background/80 backdrop-blur-sm"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/dashboard"
          className="text-base font-bold text-brand-indigo tracking-tight"
        >
          CodeReps
        </Link>

        <ul className="flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-indigo ${
                    isActive
                      ? "bg-brand-indigo/10 text-brand-indigo"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
