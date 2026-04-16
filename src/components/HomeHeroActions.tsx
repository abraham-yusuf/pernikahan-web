"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

export function HomeHeroActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href="#templates"
        onClick={() =>
          trackEvent("cta_click", {
            cta_name: "lihat_template",
            placement: "hero",
            page: "home",
          })
        }
        className="px-8 py-3.5 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors text-lg"
      >
        Lihat Template
      </Link>
      <Link
        href="/undangan/modern-elegant"
        onClick={() =>
          trackEvent("cta_click", {
            cta_name: "demo_undangan",
            placement: "hero",
            page: "home",
          })
        }
        className="px-8 py-3.5 border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:border-primary hover:text-primary transition-colors text-lg"
      >
        Demo Undangan
      </Link>
    </div>
  );
}
