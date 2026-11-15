import { NextResponse } from "next/server";
import { getTestimonials, createTestimonial } from "@/lib/db";
import { checkAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json({ error: "Gagal mengambil testimoni" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAdminAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.content) {
      return NextResponse.json({ error: "Nama dan ulasan wajib diisi" }, { status: 400 });
    }
    const newTestimonial = await createTestimonial(body);
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menambahkan testimoni" }, { status: 500 });
  }
}
