import { NextResponse } from "next/server";
import { getMaterials, createMaterial } from "@/lib/db";
import { checkAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const materials = await getMaterials();
    return NextResponse.json(materials);
  } catch {
    return NextResponse.json({ error: "Gagal mengambil data material" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAdminAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newMaterial = await createMaterial(body);
    return NextResponse.json(newMaterial, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menambahkan material" }, { status: 500 });
  }
}
