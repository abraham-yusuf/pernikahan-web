import Link from "next/link";

interface EmptyInvitationsProps {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
  compact?: boolean;
}

export function EmptyInvitations({
  title,
  description,
  ctaHref,
  ctaLabel,
  compact = false,
}: EmptyInvitationsProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-dashed border-gray-200 bg-white text-center",
        compact ? "p-8" : "p-10",
      ].join(" ")}
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-3xl">
        💒
      </div>
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>
      {ctaHref && ctaLabel ? (
        <Link
          href={ctaHref}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
