import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";



// GET /api/content/pricing
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.pricing || {});
  } catch (error) {
    console.error("Error reading pricing content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/pricing
export async function POST(request: NextRequest) {
  try {
    const pricingData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección pricing
    content.pricing = pricingData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating pricing content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

