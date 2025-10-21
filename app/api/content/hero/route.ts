import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";

// GET /api/content/hero
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.hero || {});
  } catch (error) {
    console.error("Error reading hero content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/hero
export async function POST(request: NextRequest) {
  try {
    const heroData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección hero
    content.hero = heroData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating hero content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

