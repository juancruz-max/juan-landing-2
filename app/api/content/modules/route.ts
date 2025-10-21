import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";



// GET /api/content/modules
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.modules || {});
  } catch (error) {
    console.error("Error reading modules content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/modules
export async function POST(request: NextRequest) {
  try {
    const modulesData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección modules
    content.modules = modulesData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating modules content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

