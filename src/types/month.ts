export type Lang = 'ru' | 'en' | 'uk';

export interface LocalizedString {
  ru: string;
  en: string;
  uk: string;
}

export interface MonthSection {
  title: LocalizedString;
  description: LocalizedString;
}

export interface Guest {
  name: LocalizedString;
  role: LocalizedString;
  bio: LocalizedString;
  image: string;
}

export interface MonthTheme {
  title: LocalizedString;
  description: LocalizedString;
}

export interface Month {
  id: string;
  year: number;
  month: number;
  theme: MonthTheme;
  sections: MonthSection[];
  guest: Guest;
  closingMessage: LocalizedString;
  publishedAt: string;
}

export interface MonthIndexEntry {
  id: string;
  theme: LocalizedString;
  guestName: LocalizedString;
}

export interface MonthIndex {
  current: string;
  months: MonthIndexEntry[];
}

export interface Organizer {
  name: LocalizedString;
  role: LocalizedString;
  bio: LocalizedString;
  image: string;
}

export interface Offering {
  title: LocalizedString;
  description: LocalizedString;
}

export interface SiteConfig {
  about: {
    title: LocalizedString;
    mission: LocalizedString;
    description: LocalizedString;
    tags: LocalizedString;
    atmosphere: LocalizedString;
    audience: LocalizedString;
  };
  organizers: Organizer[];
  offerings: Offering[];
  pricing: {
    amount: string;
    currency: string;
    trial: LocalizedString;
    benefits: LocalizedString[];
    stripeLink: string;
    postPayment: LocalizedString;
  };
}
