import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/content/calendly
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.calendly || {});
  } catch (error) {
    console.error("Error reading calendly content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/calendly
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const calendlyData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección calendly
    content.calendly = calendlyData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating calendly content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}
