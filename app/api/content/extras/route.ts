import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";



// GET /api/content/extras
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.extras || {});
  } catch (error) {
    console.error("Error reading extras content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/extras
export async function POST(request: NextRequest) {
  try {
    const extrasData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección extras
    content.extras = extrasData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating extras content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

