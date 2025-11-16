const TOKEN_KEY = "auth_token";
const USER_ID_KEY = "user_id";
const AUTH_EVENT = "auth-changed";

export function saveToken(token) {
  if (typeof token === "string" && token.length > 0) {
    localStorage.setItem(TOKEN_KEY, token);
    window.dispatchEvent(new Event(AUTH_EVENT));
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || null;
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function onAuthChange(handler) {
  function listener() {
    handler(getToken());
  }
  window.addEventListener(AUTH_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(AUTH_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

export function saveUserId(userId) {
  if (userId === undefined || userId === null) return;
  const value = String(userId);
  if (value.length === 0) return;
  localStorage.setItem(USER_ID_KEY, value);
}

export function getUserId() {
  const v = localStorage.getItem(USER_ID_KEY);
  if (v == null) return null;
  const n = Number(v);
  return Number.isNaN(n) ? v : n;
}

// Decode base64url safely
function base64UrlDecode(input) {
  try {
    const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(json);
  } catch (_) {
    return null;
  }
}

// Returns organizerID from JWT payload if present (organizerID or organizer_id)
export function getOrganizerIdFromToken() {
  const token = getToken();
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const payload = base64UrlDecode(parts[1]);
  if (!payload) return null;
  return payload.uid ?? payload.organizerID ?? payload.organizer_id ?? null;
}



