import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { Content } from "../../../types/content";

export async function POST(request: Request) {
  try {
    const content: Content = await request.json();
    const contentPath = join(process.cwd(), "data", "content.json");

    await writeFile(contentPath, JSON.stringify(content, null, 2), "utf-8");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
