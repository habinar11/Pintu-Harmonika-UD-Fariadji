import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/db";
import { checkAdminAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Gagal mengambil pengaturan" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!checkAdminAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await updateSettings(body);

    // Invalidate all page caches so edits show immediately on main site!
    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/profil");
      revalidatePath("/produk");
      revalidatePath("/material");
      revalidatePath("/project");
      revalidatePath("/testimoni");
      revalidatePath("/kerjasama");
      revalidatePath("/kontak");
    } catch (e) {
      console.warn("revalidatePath error:", e);
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Gagal memperbarui pengaturan" }, { status: 500 });
  }
}
