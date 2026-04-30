import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import { assetUrl } from '../../lib/assets';
import type { Month, Guest, LocalizedString } from '../../types/month';

interface Props {
  month: Month;
}

type T = (s: LocalizedString) => string;

export default function GuestSection({ month }: Props) {
  const { t } = useLang();
  const guests = month.guests;

  if (!guests || guests.length === 0) return null;

  const single = guests.length === 1;

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-warm to-bg opacity-80" />
      <div className="max-w-3xl mx-auto text-center relative">
        <span className="line-ornament mb-6" />
        <h2 className="font-serif text-3xl md:text-4xl font-light text-text-hover mb-14 italic">
          {single ? t(ui.guestOfMonth) : t(ui.guestsOfMonth)}
        </h2>
        {single ? (
          <SingleGuest guest={guests[0]} t={t} />
        ) : (
          <div className="grid sm:grid-cols-2 gap-12">
            {guests.map((g, i) => (
              <MultiGuest key={i} guest={g} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SingleGuest({ guest, t }: { guest: Guest; t: T }) {
  return (
    <>
      <div className="w-44 h-44 rounded-full overflow-hidden mx-auto mb-8 ring-1 ring-accent/20 ring-offset-4 ring-offset-bg-warm">
        <img
          src={assetUrl(guest.image)}
          alt={t(guest.name)}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <h3 className="font-serif text-text-hover text-2xl mb-1 italic">{t(guest.name)}</h3>
      <p className="text-accent text-sm tracking-wide mb-5">{t(guest.role)}</p>
      {guest.bio && <p className="text-text leading-relaxed max-w-md mx-auto">{t(guest.bio)}</p>}
    </>
  );
}

function MultiGuest({ guest, t }: { guest: Guest; t: T }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-36 h-36 rounded-full overflow-hidden mb-6 ring-1 ring-accent/20 ring-offset-4 ring-offset-bg-warm">
        <img
          src={assetUrl(guest.image)}
          alt={t(guest.name)}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <h3 className="font-serif text-text-hover text-xl mb-1 italic">{t(guest.name)}</h3>
      <p className="text-accent text-sm tracking-wide mb-4">{t(guest.role)}</p>
      {guest.bio && <p className="text-text leading-relaxed text-[0.95rem]">{t(guest.bio)}</p>}
    </div>
  );
}
