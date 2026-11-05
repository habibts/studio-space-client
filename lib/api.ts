export const API_BASE_URL: string = "/api/backend";

export function api(path: string): string {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
