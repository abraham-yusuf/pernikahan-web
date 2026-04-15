import Link from "next/link";
import { getLoggedInUser } from "@/lib/auth";
import MobileMenu from "./MobileMenu";

export async function Navbar() {
  const user = await getLoggedInUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">💍</span>
            <span className="text-xl font-bold text-gray-900">
              Nikah<span className="text-primary">Digital</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 sm:flex">
            <Link
              href="/#templates"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              Template
            </Link>
            <Link
              href="/#fitur"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              Fitur
            </Link>
            <Link
              href="/#harga"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              Harga
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  Masuk
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  Daftar Gratis
                </Link>
              </div>
            )}
          </div>

          <MobileMenu isLoggedIn={!!user} />
        </div>
      </div>
    </nav>
  );
}
