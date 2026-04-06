const GITHUB_API = 'https://api.github.com';

const OWNER = 'olegleyz';
const REPO = 'tclub';

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };
}

function repoUrl(path: string) {
  return `${GITHUB_API}/repos/${OWNER}/${REPO}/contents/${path}`;
}

// ─── Token Auth ───

/** Verify token and get username */
export async function getAuthenticatedUser(token: string): Promise<{ login: string; avatar_url: string }> {
  const res = await fetch(`${GITHUB_API}/user`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error('Invalid token');
  return res.json();
}

/** Check if user has write access to the repo */
export async function checkRepoAccess(token: string): Promise<boolean> {
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) return false;
  const data = await res.json();
  return data.permissions?.push === true || data.permissions?.admin === true;
}

// ─── Repo Operations ───

/** Get a file's content and SHA from the repo */
export async function getFile(token: string, path: string): Promise<{ content: string; sha: string } | null> {
  const res = await fetch(repoUrl(path), { headers: authHeaders(token) });
  if (!res.ok) return null;
  const data = await res.json();
  return {
    content: atob(data.content),
    sha: data.sha,
  };
}

/** Create or update a file in the repo */
export async function putFile(
  token: string,
  path: string,
  content: string,
  message: string,
  sha?: string,
): Promise<void> {
  const body: Record<string, string> = {
    message,
    content: btoa(unescape(encodeURIComponent(content))),
  };
  if (sha) body.sha = sha;

  const res = await fetch(repoUrl(path), {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to save file');
  }
}

/** Upload a binary file (image) to the repo */
export async function uploadImage(
  token: string,
  path: string,
  base64Content: string,
  message: string,
): Promise<void> {
  const res = await fetch(repoUrl(path), {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({ message, content: base64Content }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to upload image');
  }
}

/** Create a GitHub issue */
export async function createIssue(
  token: string,
  title: string,
  body: string,
  labels: string[],
): Promise<string> {
  const res = await fetch(`${GITHUB_API}/repos/${OWNER}/${REPO}/issues`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ title, body, labels }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create issue');
  }
  const data = await res.json();
  return data.html_url;
}
