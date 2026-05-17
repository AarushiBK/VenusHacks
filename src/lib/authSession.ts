const SESSION_KEY = "carechain_session";
const NAME_KEY = "carechain_user_name";
const SESSION_COOKIE = "carechain_session";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SESSION_KEY) === "1";
}

export function getDisplayName(): string {
  if (typeof window === "undefined") return "Alex";
  return window.localStorage.getItem(NAME_KEY) ?? "Alex";
}

export function setAuthenticated(displayName: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, "1");
  window.localStorage.setItem(NAME_KEY, displayName.trim() || "Alex");
  document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

export function clearAuthenticated() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(NAME_KEY);
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
