import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";



// GET /api/content/instructor
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.instructor || {});
  } catch (error) {
    console.error("Error reading instructor content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/instructor
export async function POST(request: NextRequest) {
  try {
    const instructorData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección instructor
    content.instructor = instructorData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating instructor content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

