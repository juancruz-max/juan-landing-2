import fs from 'fs/promises';
import path from 'path';
import { Content } from '@/types/content';

const contentFilePath = path.join(process.cwd(), 'data', 'content.json');

/**
 * Lee el archivo de contenido
 */
export async function readContentFile(): Promise<Content> {
  try {
    const content = await fs.readFile(contentFilePath, 'utf8');
    return JSON.parse(content);
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
    await fs.writeFile(contentFilePath, contentStr, 'utf8');
  } catch (error) {
    console.error('Error writing content file:', error);
    throw error;
  }
}
