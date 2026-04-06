import type { SiteConfig, MonthIndex, Month } from '../types/month';

const BASE = import.meta.env.BASE_URL;

export async function loadSiteConfig(): Promise<SiteConfig> {
  const res = await fetch(`${BASE}content/site.json`);
  return res.json();
}

export async function loadMonthIndex(): Promise<MonthIndex> {
  const res = await fetch(`${BASE}content/months/index.json`);
  return res.json();
}

export async function loadMonth(id: string): Promise<Month> {
  const res = await fetch(`${BASE}content/months/${id}.json`);
  return res.json();
}
