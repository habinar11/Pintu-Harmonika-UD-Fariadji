import { cookies } from "next/headers";

const ADMIN_TOKEN_NAME = "pintu_harmonika_admin_token";
const SECRET_TOKEN = "token_harmonika_admin_auth_2024_secure_session";

export function checkAdminAuth(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_TOKEN_NAME)?.value;
    return token === SECRET_TOKEN;
  } catch {
    return false;
  }
}

export function setAdminCookie() {
  const cookieStore = cookies();
  cookieStore.set(ADMIN_TOKEN_NAME, SECRET_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export function clearAdminCookie() {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_TOKEN_NAME);
}
