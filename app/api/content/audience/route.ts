import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";



// GET /api/content/audience
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.audience || {});
  } catch (error) {
    console.error("Error reading audience content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/audience
export async function POST(request: NextRequest) {
  try {
    const audienceData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección audience
    content.audience = audienceData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating audience content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

