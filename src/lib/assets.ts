const BASE = import.meta.env.BASE_URL;

/** Resolve an asset path (from JSON content) to a full URL with base path */
export function assetUrl(path: string): string {
  // Remove leading slash if present, BASE already ends with /
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE}${clean}`;
}
