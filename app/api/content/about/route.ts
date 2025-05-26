import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";

// GET /api/content/about
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.about || {});
  } catch (error) {
    console.error("Error reading about content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/about
export async function POST(request: NextRequest) {
  try {
    const aboutData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección about
    content.about = aboutData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating about content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}
