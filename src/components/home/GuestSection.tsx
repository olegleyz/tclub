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
    <section className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden">
      {/* Soft moss wash to accent the body theme */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 90% 50%, rgba(177,75,42,0.05) 0%, transparent 60%), radial-gradient(ellipse 70% 90% at 5% 30%, rgba(90,103,69,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="rule-strip mb-16">
          <span className="rule-label text-clay">§ 05</span>
          <span className="rule-line" />
          <span className="rule-label">
            {single ? t(ui.guestOfMonth) : t(ui.guestsOfMonth)}
          </span>
          <span className="rule-line" />
          <span className="rule-label hidden md:inline">
            {guests.length.toString().padStart(2, '0')} · {t(ui.portrait)}
          </span>
        </div>

        <h2
          className="display-italic mb-20 max-w-4xl"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
            fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'WONK' 1",
          }}
        >
          {single ? t(ui.guestOfMonth) : t(ui.guestsOfMonth)}
        </h2>

        {single ? (
          <SingleGuest guest={guests[0]} t={t} />
        ) : (
          <div className="space-y-24 md:space-y-32">
            {guests.map((g, i) => (
              <GuestRow key={i} guest={g} index={i} total={guests.length} t={t} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SingleGuest({ guest, t }: { guest: Guest; t: T }) {
  return (
    <div className="grid md:grid-cols-12 gap-x-10 gap-y-10 items-center">
      <figure className="md:col-span-5 relative">
        <div className="paper-frame" style={{ transform: 'rotate(-1.4deg)' }}>
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={assetUrl(guest.image)}
              alt={t(guest.name)}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top"
              style={{ filter: 'sepia(0.1) saturate(0.96)' }}
            />
          </div>
          <span className="tape" style={{ top: '-8px', left: '40px', transform: 'rotate(-5deg)' }} />
        </div>
        <figcaption className="mt-4 mono-cap-sm text-ink-soft">
          <span className="text-clay">Fig. 01</span> — Guest portrait
        </figcaption>
      </figure>
      <div className="md:col-span-7 md:pl-8">
        <h3
          className="font-serif italic text-ink mb-3 leading-[0.95]"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontVariationSettings: "'opsz' 96, 'SOFT' 70, 'WONK' 1",
          }}
        >
          {t(guest.name)}
        </h3>
        <p className="mono-cap-sm text-clay mb-6">{t(guest.role)}</p>
        {guest.bio && (
          <p
            className="font-serif text-lg md:text-xl text-ink-soft leading-[1.65] max-w-2xl"
            style={{ fontVariationSettings: "'opsz' 18, 'SOFT' 30" }}
          >
            {t(guest.bio)}
          </p>
        )}
      </div>
    </div>
  );
}

function GuestRow({
  guest,
  index,
  total,
  t,
}: {
  guest: Guest;
  index: number;
  total: number;
  t: T;
}) {
  const layouts = [
    { imgSide: 'left' as const, imgSpan: 'md:col-span-5', txtSpan: 'md:col-span-6 md:col-start-7', rotate: -1.6, aspect: '4/5', tape: { top: '-8px', left: '32px', rotate: '-4deg' } },
    { imgSide: 'right' as const, imgSpan: 'md:col-span-4 md:col-start-8', txtSpan: 'md:col-span-6 md:col-start-1 md:mt-12', rotate: 1.2, aspect: '3/4', tape: { top: '-8px', right: '28px', rotate: '4deg' } },
    { imgSide: 'left' as const, imgSpan: 'md:col-span-4 md:col-start-2', txtSpan: 'md:col-span-5 md:col-start-7 md:mt-20', rotate: -0.8, aspect: '4/5', tape: { top: '-8px', right: '40px', rotate: '-3deg' } },
    { imgSide: 'right' as const, imgSpan: 'md:col-span-5 md:col-start-7', txtSpan: 'md:col-span-5 md:col-start-1', rotate: 1.4, aspect: '3/4', tape: { top: '-8px', left: '36px', rotate: '5deg' } },
    { imgSide: 'left' as const, imgSpan: 'md:col-span-6', txtSpan: 'md:col-span-5 md:col-start-8 md:mt-16', rotate: -1.1, aspect: '4/5', tape: { top: '-8px', left: '50px', rotate: '-2deg' } },
  ];
  const layout = layouts[index % layouts.length];
  const fig = String(index + 2).padStart(2, '0'); // start at 02, hero photo was Fig. 01

  const imageBlock = (
    <figure className={`relative ${layout.imgSpan}`}>
      <div className="paper-frame" style={{ transform: `rotate(${layout.rotate}deg)` }}>
        <div className="overflow-hidden" style={{ aspectRatio: layout.aspect }}>
          <img
            src={assetUrl(guest.image)}
            alt={t(guest.name)}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.03]"
            style={{ filter: 'sepia(0.1) saturate(0.95)' }}
          />
        </div>
        <span
          className="tape"
          style={{
            top: layout.tape.top,
            left: (layout.tape as { left?: string }).left,
            right: (layout.tape as { right?: string }).right,
            transform: `rotate(${layout.tape.rotate})`,
          }}
        />
      </div>
      <figcaption className="mt-3 flex items-center gap-3 mono-cap-sm text-ink-soft">
        <span className="text-clay">Fig. {fig}</span>
        <span className="h-px w-10 bg-ink/20" />
        <span className="opacity-70">— {String(index + 1)} / {total} —</span>
      </figcaption>
    </figure>
  );

  const textBlock = (
    <div className={layout.txtSpan}>
      <div className="flex items-baseline gap-3 mb-4">
        <span className="mono-cap-sm text-clay">No. {String(index + 1).padStart(2, '0')}</span>
        <span className="h-px flex-1 max-w-[80px] bg-ink/15" />
      </div>
      <h3
        className="font-serif italic text-ink mb-3 leading-[0.95]"
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontVariationSettings: "'opsz' 72, 'SOFT' 70, 'WONK' 1",
        }}
      >
        {t(guest.name)}
      </h3>
      <p className="mono-cap-sm text-clay mb-5">{t(guest.role)}</p>
      {guest.bio && (
        <p
          className="font-serif text-base md:text-lg text-ink-soft leading-[1.7] max-w-[42ch]"
          style={{ fontVariationSettings: "'opsz' 18, 'SOFT' 30" }}
        >
          {t(guest.bio)}
        </p>
      )}
    </div>
  );

  return (
    <article className="grid md:grid-cols-12 gap-x-10 gap-y-10 items-start">
      {layout.imgSide === 'left' ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </article>
  );
}
