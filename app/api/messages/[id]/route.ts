import { NextResponse } from "next/server";
import { updateMessageStatus, deleteMessage } from "@/lib/db";
import { checkAdminAuth } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!checkAdminAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const success = await updateMessageStatus(params.id, body.status);
    if (!success) {
      return NextResponse.json({ error: "Pesan tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ message: "Status pesan diperbarui" });
  } catch {
    return NextResponse.json({ error: "Gagal memperbarui status" }, { status: 500 });
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
    const success = await deleteMessage(params.id);
    if (!success) {
      return NextResponse.json({ error: "Pesan tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ message: "Pesan berhasil dihapus" });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus pesan" }, { status: 500 });
  }
}
