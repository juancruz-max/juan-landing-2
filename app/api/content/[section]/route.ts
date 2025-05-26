import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getFileFromGitHub, updateFileInGitHub } from "@/lib/github";

const contentPath = path.join(process.cwd(), "data/content.json");
const isProduction = process.env.NODE_ENV === 'production';

export async function GET(
  request: Request,
  { params }: { params: { section: string } }
) {
  try {
    console.log(`GET request for section: ${params.section}`);

    let content;

    if (isProduction) {
      // En producción, leer desde GitHub
      try {
        const { content: githubContent } = await getFileFromGitHub('data/content.json');
        content = githubContent;
      } catch (githubError) {
        console.error('Error reading from GitHub, falling back to local file:', githubError);
        // Si falla, intentar leer el archivo local como fallback
        content = JSON.parse(await fs.readFile(contentPath, "utf8"));
      }
    } else {
      // En desarrollo, leer desde el archivo local
      content = JSON.parse(await fs.readFile(contentPath, "utf8"));
    }

    return NextResponse.json(content[params.section] || {});
  } catch (error) {
    console.error(`Error reading content for section ${params.section}:`, error);
    return NextResponse.json(
      { error: "Error al leer el contenido", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { section: string } }
) {
  try {
    console.log(`POST request for section: ${params.section}`);
    const updatedData = await request.json();

    let content;
    let sha = '';

    if (isProduction) {
      // En producción, actualizar a través de GitHub
      try {
        // Obtener el contenido actual y el SHA del archivo
        const githubData = await getFileFromGitHub('data/content.json');
        content = githubData.content;
        sha = githubData.sha;

        // Actualizar la sección específica
        content[params.section] = updatedData;

        // Guardar los cambios en GitHub
        await updateFileInGitHub('data/content.json', content, sha);

        // También intentamos actualizar el archivo local para mantener la coherencia
        try {
          await fs.writeFile(contentPath, JSON.stringify(content, null, 2));
        } catch (localWriteError) {
          console.warn('Could not update local file in production, but GitHub update succeeded:', localWriteError);
          // No fallamos si esto no funciona, ya que la actualización de GitHub es lo importante
        }
      } catch (githubError) {
        console.error('Error updating content via GitHub:', githubError);
        return NextResponse.json(
          { error: "Error al guardar el contenido en GitHub", details: (githubError as Error).message },
          { status: 500 }
        );
      }
    } else {
      // En desarrollo, actualizar el archivo local
      content = JSON.parse(await fs.readFile(contentPath, "utf8"));
      content[params.section] = updatedData;
      await fs.writeFile(contentPath, JSON.stringify(content, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`Error saving content for section ${params.section}:`, error);
    return NextResponse.json(
      { error: "Error al guardar el contenido", details: (error as Error).message },
      { status: 500 }
    );
  }
}
