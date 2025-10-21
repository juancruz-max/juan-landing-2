import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";



// GET /api/content/requirements
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.requirements || {});
  } catch (error) {
    console.error("Error reading requirements content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/requirements
export async function POST(request: NextRequest) {
  try {
    const requirementsData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección requirements
    content.requirements = requirementsData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating requirements content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}
