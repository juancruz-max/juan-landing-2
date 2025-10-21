import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";



// GET /api/content/footer
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.footer || {});
  } catch (error) {
    console.error("Error reading footer content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/footer
export async function POST(request: NextRequest) {
  try {
    const footerData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección footer
    content.footer = footerData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating footer content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}
