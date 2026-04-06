import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import { assetUrl } from '../../lib/assets';
import type { Month } from '../../types/month';

interface Props {
  month: Month;
}

export default function GuestSection({ month }: Props) {
  const { t } = useLang();
  const { guest } = month;

  return (
    <section className="py-20 px-4 bg-bg-card">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-light text-text-hover mb-12">
          {t(ui.guestOfMonth)}
        </h2>
        <img
          src={assetUrl(guest.image)}
          alt={t(guest.name)}
          className="w-40 h-40 rounded-full object-cover object-top mx-auto mb-6 shadow-md"
        />
        <h3 className="text-text-hover font-medium text-xl mb-1">{t(guest.name)}</h3>
        <p className="text-accent text-sm mb-4">{t(guest.role)}</p>
        <p className="text-text leading-relaxed max-w-lg mx-auto">{t(guest.bio)}</p>
      </div>
    </section>
  );
}
