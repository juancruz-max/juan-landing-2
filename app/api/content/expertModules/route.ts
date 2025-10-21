import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";



// GET /api/content/expertModules
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.expertModules || {});
  } catch (error) {
    console.error("Error reading expertModules content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/expertModules
export async function POST(request: NextRequest) {
  try {
    const expertModulesData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección expertModules
    content.expertModules = expertModulesData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating expertModules content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

