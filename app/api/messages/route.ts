import { NextResponse } from "next/server";
import { getMessages, createMessage } from "@/lib/db";
import { checkAdminAuth } from "@/lib/auth";

export async function GET() {
  if (!checkAdminAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await getMessages();
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json({ error: "Gagal mengambil pesan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: "Nama dan nomor telepon / WhatsApp wajib diisi" }, { status: 400 });
    }
    const newMsg = await createMessage(body);
    return NextResponse.json(newMsg, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal mengirim pesan" }, { status: 500 });
  }
}
