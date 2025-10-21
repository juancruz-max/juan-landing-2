import fs from 'fs/promises';
import path from 'path';
import { Content } from '@/types/content';
import { getFileFromGitHub, updateFileInGitHub } from '@/lib/github';

const contentFilePath = path.join(process.cwd(), 'data', 'content.json');
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Lee el archivo de contenido
 */
export async function readContentFile(): Promise<Content> {
  try {
    let content;

    if (isProduction) {
      // En producción, leer desde GitHub
      try {
        const { content: githubContent } = await getFileFromGitHub('data/content.json');
        content = githubContent;
      } catch (githubError) {
        console.error('Error reading from GitHub, falling back to local file:', githubError);
        // Si falla, intentar leer el archivo local como fallback
        content = JSON.parse(await fs.readFile(contentFilePath, 'utf8'));
      }
    } else {
      // En desarrollo, leer desde el archivo local
      content = JSON.parse(await fs.readFile(contentFilePath, 'utf8'));
    }

    return content;
  } catch (error) {
    console.error('Error reading content file:', error);
    throw error;
  }
}

/**
 * Escribe en el archivo de contenido
 */
export async function writeContentFile(content: Content): Promise<void> {
  try {
    const contentStr = JSON.stringify(content, null, 2);

    if (isProduction) {
      // En producción, actualizar a través de GitHub
      try {
        console.log('[PRODUCTION] Fetching current content from GitHub');
        const githubData = await getFileFromGitHub('data/content.json');
        const sha = githubData.sha;

        console.log('[PRODUCTION] Updating content in GitHub');
        await updateFileInGitHub('data/content.json', content, sha);

        // También intentamos actualizar el archivo local para mantener la coherencia
        try {
          await fs.writeFile(contentFilePath, contentStr, 'utf8');
        } catch (localWriteError) {
          console.warn('Could not update local file in production, but GitHub update succeeded:', localWriteError);
          // No fallamos si esto no funciona, ya que la actualización de GitHub es lo importante
        }
      } catch (githubError) {
        console.error('[PRODUCTION] Error updating content via GitHub:', githubError);
        throw githubError;
      }
    } else {
      // En desarrollo, actualizar el archivo local
      await fs.writeFile(contentFilePath, contentStr, 'utf8');
    }
  } catch (error) {
    console.error('Error writing content file:', error);
    throw error;
  }
}
