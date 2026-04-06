import { useState, useEffect } from 'react';
import type { SiteConfig, MonthIndex, Month } from '../types/month';
import { loadSiteConfig, loadMonthIndex, loadMonth } from '../lib/content';

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  useEffect(() => { loadSiteConfig().then(setConfig); }, []);
  return config;
}

export function useMonthIndex() {
  const [index, setIndex] = useState<MonthIndex | null>(null);
  useEffect(() => { loadMonthIndex().then(setIndex); }, []);
  return index;
}

export function useMonth(id: string | undefined) {
  const [month, setMonth] = useState<Month | null>(null);
  useEffect(() => {
    if (id) loadMonth(id).then(setMonth);
  }, [id]);
  return month;
}
