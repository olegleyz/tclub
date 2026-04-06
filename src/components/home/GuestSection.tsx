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
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-warm to-bg opacity-80" />
      <div className="max-w-2xl mx-auto text-center relative">
        <span className="line-ornament mb-6" />
        <h2 className="font-serif text-3xl md:text-4xl font-light text-text-hover mb-14 italic">
          {t(ui.guestOfMonth)}
        </h2>
        <div className="w-44 h-44 rounded-full overflow-hidden mx-auto mb-8 ring-1 ring-accent/20 ring-offset-4 ring-offset-bg-warm">
          <img
            src={assetUrl(guest.image)}
            alt={t(guest.name)}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <h3 className="font-serif text-text-hover text-2xl mb-1 italic">{t(guest.name)}</h3>
        <p className="text-accent text-sm tracking-wide mb-5">{t(guest.role)}</p>
        <p className="text-text leading-relaxed max-w-md mx-auto">{t(guest.bio)}</p>
      </div>
    </section>
  );
}
