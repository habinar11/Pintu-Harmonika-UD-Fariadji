import { NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/db";
import { checkAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Gagal mengambil data produk" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAdminAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.pricePerMeter) {
      return NextResponse.json({ error: "Nama dan harga produk wajib diisi" }, { status: 400 });
    }
    const newProduct = await createProduct(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menambahkan produk" }, { status: 500 });
  }
}
