import { useState, useEffect } from 'react';
import type { SiteConfig, MonthIndex, Month } from '../types/month';
import { loadSiteConfig, loadMonthIndex, loadMonth } from '../lib/content';

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  useEffect(() => {
    loadSiteConfig()
      .then(setConfig)
      .catch((err) => console.error('Failed to load site config:', err));
  }, []);
  return config;
}

export function useMonthIndex() {
  const [index, setIndex] = useState<MonthIndex | null>(null);
  useEffect(() => {
    loadMonthIndex()
      .then(setIndex)
      .catch((err) => console.error('Failed to load month index:', err));
  }, []);
  return index;
}

export function useMonth(id: string | undefined) {
  const [month, setMonth] = useState<Month | null>(null);
  useEffect(() => {
    if (id) {
      loadMonth(id)
        .then(setMonth)
        .catch((err) => console.error('Failed to load month:', id, err));
    }
  }, [id]);
  return month;
}
