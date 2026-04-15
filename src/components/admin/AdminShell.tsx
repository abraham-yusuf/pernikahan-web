"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";

interface AdminShellProps {
  user: {
    name?: string | null;
    email: string;
  };
  children: ReactNode;
}

const adminNavItems = [
  { href: "/admin", label: "Overview", icon: "📊" },
  { href: "/admin/users", label: "Pengguna", icon: "👥" },
  { href: "/admin/templates", label: "Template", icon: "🎨" },
  { href: "/admin/analytics", label: "Analitik", icon: "📈" },
] as const;

function isActivePath(pathname: string, href: (typeof adminNavItems)[number]["href"]) {
  if (href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-white shadow-lg shadow-primary/20"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
      ].join(" ")}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const displayName = user.name?.trim() || user.email;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 md:hidden"
              aria-label={mobileOpen ? "Tutup navigasi admin" : "Buka navigasi admin"}
              aria-expanded={mobileOpen}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-2xl">💍</span>
              <span className="text-xl font-bold text-gray-900">
                Nikah<span className="text-primary">Digital</span>
              </span>
              <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                Admin
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-900">{displayName}</p>
              <p className="text-xs text-gray-500">Administrator platform</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="sticky top-[88px] hidden h-[calc(100vh-112px)] w-64 shrink-0 md:block">
          <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4">
            <div className="border-b border-gray-100 px-2 pb-4">
              <p className="text-sm font-semibold text-gray-900">Panel Admin</p>
              <p className="mt-1 text-sm text-gray-500">
                Kelola pengguna, template, dan analitik platform.
              </p>
            </div>
            <nav className="mt-4 flex-1 space-y-2">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={isActivePath(pathname, item.href)}
                />
              ))}
            </nav>
            <div className="border-t border-gray-100 pt-4">
              <NavLink
                href="/dashboard"
                label="Kembali ke Dashboard"
                icon="↩️"
                active={false}
              />
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>

      <div
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-gray-100 bg-white p-5 transition-transform md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Panel Admin</p>
            <p className="mt-1 text-sm text-gray-500">{displayName}</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600"
            aria-label="Tutup menu admin"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-5 space-y-2">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActivePath(pathname, item.href)}
              onClick={() => setMobileOpen(false)}
            />
          ))}
          <NavLink
            href="/dashboard"
            label="Kembali ke Dashboard"
            icon="↩️"
            active={false}
            onClick={() => setMobileOpen(false)}
          />
        </nav>
      </aside>
    </div>
  );
}
