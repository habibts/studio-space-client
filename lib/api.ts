/**
 * API base URL helper.
 *
 * Reads the backend URL from environment variables so the same code works
 * in local development and in production without any hardcoding.
 *
 * Local development:
 *   NEXT_PUBLIC_API_URL=http://localhost:3001
 *
 * Production (Vercel):
 *   NEXT_PUBLIC_API_URL=https://studio-space-server-ruby.vercel.app
 */

export const API_BASE_URL: string = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
).replace(/\/+$/, "");

export function api(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}