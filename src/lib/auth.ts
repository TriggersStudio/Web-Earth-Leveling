import { db } from "./db";
import { cookies } from "next/headers";
import { randomBytes, scrypt, timingSafeEqual, createHmac } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

// Secret key for signing session tokens (should be in env in production)
const SESSION_SECRET = process.env.SESSION_SECRET || "default-secret-change-in-production";

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${buf.toString("hex")}`;
}

export async function verifyPassword(
  storedPassword: string,
  suppliedPassword: string
): Promise<boolean> {
  const [salt, hashedPassword] = storedPassword.split(":");
  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
  const hashedSuppliedPassword = buf.toString("hex");
  return timingSafeEqual(
    Buffer.from(hashedPassword, "hex"),
    Buffer.from(hashedSuppliedPassword, "hex")
  );
}

export function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

function createSignedToken(userId: string, expiresAt: Date): string {
  const payload = JSON.stringify({ userId, exp: expiresAt.getTime() });
  const payloadBase64 = Buffer.from(payload).toString("base64url");
  const signature = createHmac("sha256", SESSION_SECRET)
    .update(payloadBase64)
    .digest("base64url");
  return `${payloadBase64}.${signature}`;
}

function verifySignedToken(token: string): { userId: string; exp: number } | null {
  try {
    const [payloadBase64, signature] = token.split(".");
    if (!payloadBase64 || !signature) return null;

    const expectedSignature = createHmac("sha256", SESSION_SECRET)
      .update(payloadBase64)
      .digest("base64url");

    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString());
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); 
  const token = createSignedToken(userId, expiresAt);

  const cookieStore = await cookies();
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return { userId, expiresAt };
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  if (!token) return null;

  const payload = verifySignedToken(token);
  if (!payload) return null;

  if (payload.exp < Date.now()) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) return null;

  return { user, expiresAt: new Date(payload.exp) };
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
}
