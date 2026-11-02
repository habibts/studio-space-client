import { authClient } from "@/lib/auth-client";

export function useCurrentUser() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user ?? null;
  return {
    user,
    session,
    isPending,
    isAuthenticated: !!user,
  };
}