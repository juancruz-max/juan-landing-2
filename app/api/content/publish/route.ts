import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { simpleGit } from "simple-git";
import { getFileFromGitHub, updateFileInGitHub } from "@/lib/github";

const contentPath = path.join(process.cwd(), "data/content.json");
const git = simpleGit();
const isProduction = process.env.NODE_ENV === 'production';

export async function POST() {
  try {
    if (isProduction) {
      // En producción, no necesitamos hacer nada adicional ya que los cambios
      // ya se han guardado directamente en GitHub a través de la API
      return NextResponse.json({
        success: true,
        message: "Los cambios ya han sido publicados en GitHub automáticamente."
      });
    }

    // En desarrollo, usamos Git para publicar los cambios
    // Verificar si hay cambios en el archivo content.json
    const status = await git.status();
    const hasChanges = status.modified.includes("data/content.json");

    if (!hasChanges) {
      return NextResponse.json({ message: "No hay cambios para publicar" });
    }

    // Configurar git con las credenciales del bot
    await git.addConfig(
      "user.name",
      process.env.GIT_USER_NAME || "Content Bot"
    );
    await git.addConfig(
      "user.email",
      process.env.GIT_USER_EMAIL || "bot@example.com"
    );

    // Agregar y commitear los cambios
    await git.add(contentPath);
    await git.commit("Update content.json via admin dashboard");

    // Pushear los cambios
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO) {
      const remoteUrl = `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}.git`;
      const branch = process.env.GITHUB_BRANCH || "main";
      await git.push(remoteUrl, branch);
      console.log(`Changes pushed to GitHub repository on branch ${branch}`);
    } else {
      console.warn("GitHub token or repository not configured. Changes committed locally only.");
      return NextResponse.json({
        success: true,
        warning: "Cambios guardados localmente, pero no se han publicado en GitHub. Configure las variables de entorno GITHUB_TOKEN, GITHUB_OWNER y GITHUB_REPO."
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error publishing changes:", error);
    return NextResponse.json(
      { error: "Error al publicar los cambios" },
      { status: 500 }
    );
  }
}
