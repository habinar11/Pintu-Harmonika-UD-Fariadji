import { NextResponse } from "next/server";
import { checkAdminAuth, setAdminCookie, clearAdminCookie } from "@/lib/auth";

export async function GET() {
  const isAuth = checkAdminAuth();
  return NextResponse.json({ authenticated: isAuth });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Default admin credentials (can be customized by user)
    if (username === "admin" && (password === "admin123" || password === "harmonika2024")) {
      setAdminCookie();
      return NextResponse.json({ success: true, message: "Login berhasil" });
    }

    return NextResponse.json(
      { success: false, message: "Username atau password salah" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  clearAdminCookie();
  return NextResponse.json({ success: true, message: "Logout berhasil" });
}
