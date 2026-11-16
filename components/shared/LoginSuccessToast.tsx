"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/useCurrentUser";

/**
 * Social sign-in (Google / GitHub) performs a full-page redirect to the
 * provider and back, which destroys any toast fired before leaving. The login
 * page therefore writes this flag before redirecting; this component lives in
 * the root layout and fires the success toast once the session is known.
 */
export const LOGIN_SUCCESS_FLAG = "studioLoginSuccess";

export function markLoginSuccess(provider?: string) {
  try {
    sessionStorage.setItem(LOGIN_SUCCESS_FLAG, provider ?? "email");
  } catch {
    /* storage unavailable — toast is best-effort */
  }
}

export default function LoginSuccessToast() {
  const { user, isPending } = useCurrentUser();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current || isPending) return;

    let provider: string | null = null;
    try {
      provider = sessionStorage.getItem(LOGIN_SUCCESS_FLAG);
      if (provider) sessionStorage.removeItem(LOGIN_SUCCESS_FLAG);
    } catch {
      return;
    }
    if (!provider) return;

    handled.current = true;
    if (!user) return; // session never arrived — nothing to celebrate

    toast.success(`Welcome back${user.name ? `, ${user.name}` : ""}!`, {
      description: `You're signed in as ${user.email}.`,
      duration: 6000,
      action: {
        label: "My bookings",
        onClick: () => {
          window.location.href = "/my-bookings";
        },
      },
    });
  }, [isPending, user]);

  return null;
}
