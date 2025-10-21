import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";



// GET /api/content/recapitulacion
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.recapitulacion || {});
  } catch (error) {
    console.error("Error reading recapitulacion content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/recapitulacion
export async function POST(request: NextRequest) {
  try {
    const recapitulacionData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección recapitulacion
    content.recapitulacion = recapitulacionData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating recapitulacion content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

