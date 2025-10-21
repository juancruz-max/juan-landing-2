import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";

// GET /api/content/problems
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.problems || {});
  } catch (error) {
    console.error("Error reading problems content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/problems
export async function POST(request: NextRequest) {
  try {

    const problemsData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección problems
    content.problems = problemsData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating problems content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

