import { useSiteConfig, useMonthIndex, useMonth } from '../hooks/useContent';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import MonthStructure from '../components/home/MonthStructure';
import MonthScheduleSection from '../components/home/MonthScheduleSection';
import OrganizersSection from '../components/home/OrganizersSection';
import GuestSection from '../components/home/GuestSection';
import OfferingsSection from '../components/home/OfferingsSection';
import PricingSection from '../components/home/PricingSection';
import ContactSection from '../components/home/ContactSection';
import Marquee from '../components/shared/Marquee';
import { useLang } from '../hooks/useLang';
import { ui } from '../lib/ui-strings';

export default function HomePage() {
  const config = useSiteConfig();
  const monthIndex = useMonthIndex();
  const currentMonth = useMonth(monthIndex?.current);
  const { t } = useLang();

  if (!config || !currentMonth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-clay border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <span className="edition-stamp" aria-hidden="true">
        {t(ui.volume)} · {t(ui.issueLabel)} · 05 · 26 · {t(config.about.title)}
      </span>
      <main>
        <HeroSection config={config} month={currentMonth} />
        <Marquee tags={config.about.tags} />
        <AboutSection config={config} />
        <MonthStructure month={currentMonth} />
        <MonthScheduleSection month={currentMonth} />
        <OrganizersSection config={config} />
        <GuestSection month={currentMonth} />
        <OfferingsSection config={config} />
        <PricingSection config={config} />
        <ContactSection />
      </main>
    </>
  );
}
