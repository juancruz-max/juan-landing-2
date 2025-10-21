import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";

// GET /api/content/cta
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.cta || {});
  } catch (error) {
    console.error("Error reading cta content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/cta
export async function POST(request: NextRequest) {
  try {

    const ctaData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección cta
    content.cta = ctaData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating cta content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

