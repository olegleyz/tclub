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

export default function HomePage() {
  const config = useSiteConfig();
  const monthIndex = useMonthIndex();
  const currentMonth = useMonth(monthIndex?.current);
  const fallbackCapsuleMonthId = monthIndex?.months.find(m => m.id !== monthIndex.current)?.id;
  const capsuleMonthId = monthIndex?.capsuleMonth ?? fallbackCapsuleMonthId;
  const capsuleMonth = useMonth(capsuleMonthId);

  if (!config || !currentMonth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main>
      <HeroSection config={config} month={currentMonth} capsuleMonth={capsuleMonth ?? undefined} />
      <AboutSection config={config} />
      <MonthStructure month={currentMonth} />
      <MonthScheduleSection month={currentMonth} />
      <OrganizersSection config={config} />
      <GuestSection month={currentMonth} />
      <OfferingsSection config={config} />
      <PricingSection config={config} />
      <ContactSection />
    </main>
  );
}
