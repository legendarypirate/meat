export const COOKIE_NAME = "meatadmin_session";
const SESSION_DAYS = 7;

function getSecret() {
  return process.env.SESSION_SECRET || "meat-admin-dev-secret";
}

function toBase64Url(str: string) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(b64: string) {
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function hmacHex(secret: string, message: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function verifyCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "user12";
  return username === expectedUser && password === expectedPass;
}

export async function createSessionToken() {
  const payload = JSON.stringify({
    user: process.env.ADMIN_USERNAME || "admin",
    exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  });
  const sig = await hmacHex(getSecret(), payload);
  return `${toBase64Url(payload)}.${sig}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return false;

  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return false;

  let payload: string;
  try {
    payload = fromBase64Url(payloadB64);
  } catch {
    return false;
  }

  const expected = await hmacHex(getSecret(), payload);
  if (!timingSafeEqual(sig, expected)) return false;

  try {
    const data = JSON.parse(payload) as { exp: number };
    return data.exp > Date.now();
  } catch {
    return false;
  }
}

export function sessionCookieOptions(maxAge = SESSION_DAYS * 24 * 60 * 60) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
