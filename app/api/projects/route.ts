import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/db";
import { checkAdminAuth } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Gagal mengambil data proyek" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!checkAdminAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ error: "Judul proyek wajib diisi" }, { status: 400 });
    }
    const newProject = await createProject(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Gagal menambahkan proyek" }, { status: 500 });
  }
}
