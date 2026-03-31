"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface MobileMenuProps {
  isLoggedIn: boolean;
}

const navLinks = [
  { href: "/#templates", label: "Template" },
  { href: "/#fitur", label: "Fitur" },
  { href: "/#harga", label: "Harga" },
];

export default function MobileMenu({ isLoggedIn }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Track previous open state so focus only returns when transitioning open→closed
  const wasOpenRef = useRef(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeMenu]);

  // Return focus to trigger button only when transitioning from open → closed
  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  return (
    <div className="sm:hidden">
      {/* Hamburger / Close toggle button */}
      <button
        ref={triggerRef}
        onClick={toggleMenu}
        className="relative z-[60] flex flex-col justify-center items-center w-10 h-10 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-drawer"
      >
        {/*
         * Hamburger → X animation:
         *   Each bar is h-0.5 (2px) with mt-1 (4px) gap between them.
         *   Total stack height = 14px, center = 7px.
         *   Bar 1 center is at 1px  → translate-y-1.5 (+6px) moves it to 7px.
         *   Bar 3 center is at 13px → -translate-y-1.5 (−6px) moves it to 7px.
         *   Both then rotate ±45° to form the X.
         */}
        {/* Bar 1 — rotates to form top arm of X */}
        <span
          className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        {/* Bar 2 — fades out in open state */}
        <span
          className={`block h-0.5 w-5 bg-current mt-1 transition-all duration-300 ${
            isOpen ? "opacity-0 scale-x-0" : ""
          }`}
        />
        {/* Bar 3 — rotates to form bottom arm of X */}
        <span
          className={`block h-0.5 w-5 bg-current mt-1 transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Backdrop overlay */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-in drawer */}
      <div
        id="mobile-menu-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header with logo + close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <span className="text-xl">💍</span>
            <span className="text-lg font-bold text-gray-900">
              Nikah<span className="text-primary">Digital</span>
            </span>
          </Link>
          <button
            onClick={closeMenu}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Tutup menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-1" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  className="flex items-center px-4 py-3 rounded-xl text-gray-700 font-medium text-base hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth buttons */}
        <div className="px-6 py-6 border-t border-gray-100 space-y-3">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              onClick={closeMenu}
              className="flex items-center justify-center w-full px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={closeMenu}
                className="flex items-center justify-center w-full px-6 py-3 border border-gray-200 text-gray-700 rounded-full font-semibold hover:border-primary hover:text-primary transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/auth/signup"
                onClick={closeMenu}
                className="flex items-center justify-center w-full px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                Daftar Gratis
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
