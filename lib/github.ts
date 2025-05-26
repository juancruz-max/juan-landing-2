/**
 * Utilidad para interactuar con la API de GitHub
 */

/**
 * Obtiene el contenido de un archivo del repositorio de GitHub
 */
export async function getFileFromGitHub(filePath: string): Promise<{ content: any; sha: string }> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !owner || !repo) {
    throw new Error('GitHub configuration is missing. Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables.');
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch file from GitHub: ${response.statusText}`);
  }

  const data = await response.json();
  
  // El contenido está en base64, necesitamos decodificarlo
  const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
  
  return { content, sha: data.sha };
}

/**
 * Actualiza un archivo en el repositorio de GitHub
 */
export async function updateFileInGitHub(filePath: string, content: any, sha: string): Promise<void> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const commitMessage = `Update ${filePath} via admin dashboard`;
  const committerName = process.env.GIT_USER_NAME || 'Content Bot';
  const committerEmail = process.env.GIT_USER_EMAIL || 'bot@example.com';

  if (!token || !owner || !repo) {
    throw new Error('GitHub configuration is missing. Please set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO environment variables.');
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  
  const contentStr = JSON.stringify(content, null, 2);
  const contentBase64 = Buffer.from(contentStr).toString('base64');

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    body: JSON.stringify({
      message: commitMessage,
      content: contentBase64,
      sha: sha,
      branch: branch,
      committer: {
        name: committerName,
        email: committerEmail
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to update file in GitHub: ${response.statusText}. Details: ${JSON.stringify(errorData)}`);
  }
}
