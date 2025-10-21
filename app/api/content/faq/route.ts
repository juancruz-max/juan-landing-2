import { NextRequest, NextResponse } from "next/server";
import { readContentFile, writeContentFile } from "@/lib/content";

// GET /api/content/faq
export async function GET() {
  try {
    const content = await readContentFile();
    return NextResponse.json(content.faq || {});
  } catch (error) {
    console.error("Error reading faq content:", error);
    return NextResponse.json(
      { error: "Error reading content" },
      { status: 500 }
    );
  }
}

// POST /api/content/faq
export async function POST(request: NextRequest) {
  try {

    const faqData = await request.json();
    const content = await readContentFile();

    // Actualizar la sección faq
    content.faq = faqData;

    // Guardar el contenido actualizado
    await writeContentFile(content);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating faq content:", error);
    return NextResponse.json(
      { error: "Error updating content" },
      { status: 500 }
    );
  }
}

