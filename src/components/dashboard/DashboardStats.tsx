"use client";

import { useEffect, useState } from "react";

interface InvitationSummary {
  $id: string;
  status: "draft" | "published" | "archived";
}

interface InvitationsPayload {
  invitations?: InvitationSummary[];
  total?: number;
  error?: string;
}

interface RSVPPayload {
  summary?: {
    total: number;
  };
}

interface StatState {
  loading: boolean;
  disconnected: boolean;
  totalInvitations: number | null;
  publishedInvitations: number | null;
  totalRsvps: number | null;
}

const initialState: StatState = {
  loading: true,
  disconnected: false,
  totalInvitations: null,
  publishedInvitations: null,
  totalRsvps: null,
};

async function loadInvitationPage(offset: number, limit: number) {
  const response = await fetch(`/api/invitations?limit=${limit}&offset=${offset}`, {
    cache: "no-store",
    credentials: "same-origin",
  });
  const payload = (await response.json().catch(() => null)) as
    | InvitationsPayload
    | null;

  return { response, payload };
}

async function loadAllInvitations() {
  const totalPage = await loadInvitationPage(0, 1);

  if (!totalPage.response.ok) {
    return totalPage;
  }

  const total = totalPage.payload?.total ?? 0;

  if (total === 0) {
    return {
      response: totalPage.response,
      payload: {
        invitations: [],
        total: 0,
      } satisfies InvitationsPayload,
    };
  }

  const firstPage = await loadInvitationPage(0, 100);

  if (!firstPage.response.ok) {
    return firstPage;
  }

  const invitations = firstPage.payload?.invitations ?? [];

  if (invitations.length >= total) {
    return {
      response: firstPage.response,
      payload: {
        invitations,
        total,
      } satisfies InvitationsPayload,
    };
  }

  const requests: Promise<Awaited<ReturnType<typeof loadInvitationPage>>>[] = [];

  for (let offset = invitations.length; offset < total; offset += 100) {
    requests.push(loadInvitationPage(offset, 100));
  }

  const pages = await Promise.all(requests);
  const nextInvitations = pages.flatMap((page) => page.payload?.invitations ?? []);

  return {
    response: firstPage.response,
    payload: {
      invitations: [...invitations, ...nextInvitations],
      total,
    } satisfies InvitationsPayload,
  };
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gray-100" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-16 rounded bg-gray-100" />
          <div className="h-4 w-28 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  const [state, setState] = useState<StatState>(initialState);

  useEffect(() => {
    let active = true;

    async function loadStats() {
      setState(initialState);

      try {
        const { response, payload } = await loadAllInvitations();

        if (!active) {
          return;
        }

        if (response.status === 503) {
          setState({
            loading: false,
            disconnected: true,
            totalInvitations: null,
            publishedInvitations: null,
            totalRsvps: null,
          });
          return;
        }

        if (!response.ok) {
          setState({
            loading: false,
            disconnected: false,
            totalInvitations: null,
            publishedInvitations: null,
            totalRsvps: null,
          });
          return;
        }

        const invitations = payload?.invitations ?? [];
        const publishedInvitations = invitations.filter(
          (invitation) => invitation.status === "published"
        ).length;

        const rsvpTotals = await Promise.all(
          invitations.map(async (invitation) => {
            try {
              const rsvpResponse = await fetch(
                `/api/rsvp/${encodeURIComponent(invitation.$id)}?limit=1`,
                {
                  cache: "no-store",
                  credentials: "same-origin",
                }
              );

              if (rsvpResponse.status === 503) {
                return null;
              }

              if (!rsvpResponse.ok) {
                return 0;
              }

              const rsvpPayload = (await rsvpResponse.json().catch(() => null)) as
                | RSVPPayload
                | null;

              return rsvpPayload?.summary?.total ?? 0;
            } catch {
              return 0;
            }
          })
        );

        if (!active) {
          return;
        }

        const hasUnknownRsvpTotal = rsvpTotals.some((count) => count === null);
        const knownRsvpTotals = rsvpTotals.filter(
          (count): count is number => count !== null
        );

        setState({
          loading: false,
          disconnected: false,
          totalInvitations: payload?.total ?? invitations.length,
          publishedInvitations,
          totalRsvps: hasUnknownRsvpTotal
            ? null
            : knownRsvpTotals.reduce((total, count) => total + count, 0),
        });
      } catch {
        if (active) {
          setState({
            loading: false,
            disconnected: false,
            totalInvitations: null,
            publishedInvitations: null,
            totalRsvps: null,
          });
        }
      }
    }

    void loadStats();

    return () => {
      active = false;
    };
  }, []);

  if (state.loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  const cards = [
    { label: "Total Undangan", value: state.totalInvitations, icon: "💌" },
    {
      label: "Sudah Dipublikasikan",
      value: state.publishedInvitations,
      icon: "🚀",
    },
    { label: "Total RSVP", value: state.totalRsvps, icon: "✅" },
  ];

  return (
    <div className="space-y-3">
      {state.disconnected ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Hubungkan database Appwrite Anda untuk mulai membuat undangan.
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5"
          >
            <span className="text-3xl">{card.icon}</span>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {card.value === null ? "—" : card.value}
              </p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
