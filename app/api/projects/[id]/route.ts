import { NextResponse } from "next/server";
import { updateProject, deleteProject } from "@/lib/db";
import { checkAdminAuth } from "@/lib/auth";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAdminAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updated = await updateProject(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Proyek tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Gagal memperbarui proyek" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAdminAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const success = await deleteProject(params.id);
    if (!success) {
      return NextResponse.json({ error: "Proyek tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ message: "Proyek berhasil dihapus" });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus proyek" }, { status: 500 });
  }
}
