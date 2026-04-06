import type { SiteConfig, MonthIndex, Month } from '../types/month';

const BASE = import.meta.env.BASE_URL;

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${BASE}${path}`;
  console.log('Fetching:', url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

export async function loadSiteConfig(): Promise<SiteConfig> {
  return fetchJson('content/site.json');
}

export async function loadMonthIndex(): Promise<MonthIndex> {
  return fetchJson('content/months/index.json');
}

export async function loadMonth(id: string): Promise<Month> {
  return fetchJson(`content/months/${id}.json`);
}
