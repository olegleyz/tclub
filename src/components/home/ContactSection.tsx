import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';
import { useSiteConfig } from '../../hooks/useContent';

export default function ContactSection() {
  const { t } = useLang();
  const config = useSiteConfig();

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="rule-strip mb-16">
          <span className="rule-label text-clay">§ 08</span>
          <span className="rule-line" />
          <span className="rule-label">{t(ui.contactUs)}</span>
          <span className="rule-line" />
        </div>

        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12">
          <div className="lg:col-span-5">
            <h2
              className="display-italic mb-6"
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
                fontVariationSettings: "'opsz' 144, 'SOFT' 80, 'WONK' 1",
              }}
            >
              {t(ui.contactUs)}
            </h2>
            <div className="mt-6 h-px w-24 bg-clay/60" />
          </div>

          <form
            action="https://formspree.io/f/PLACEHOLDER"
            method="POST"
            className="lg:col-span-7 space-y-9"
          >
            <label className="block">
              <span className="mono-cap-sm text-clay">— I — {t(ui.yourName)}</span>
              <input
                type="text"
                name="name"
                placeholder=""
                required
                className="mt-3 w-full bg-transparent border-0 border-b border-ink/30 px-0 py-3 text-ink text-lg font-serif italic focus:outline-none focus:border-clay transition-colors"
                style={{ fontVariationSettings: "'opsz' 24, 'SOFT' 50" }}
              />
            </label>

            <label className="block">
              <span className="mono-cap-sm text-clay">— II — {t(ui.message)}</span>
              <textarea
                name="message"
                placeholder=""
                rows={4}
                required
                className="mt-3 w-full bg-transparent border-0 border-b border-ink/30 px-0 py-3 text-ink text-lg font-serif italic focus:outline-none focus:border-clay transition-colors resize-none"
                style={{ fontVariationSettings: "'opsz' 24, 'SOFT' 50" }}
              />
            </label>

            <button
              type="submit"
              className="group inline-flex items-center gap-4 bg-ink text-paper px-8 py-4 hover:bg-clay transition-colors duration-400 cursor-pointer"
            >
              <span className="mono-cap-sm">{t(ui.send)}</span>
              <span className="w-8 h-px bg-paper transition-all duration-400 group-hover:w-14" />
              <span aria-hidden>→</span>
            </button>
          </form>
        </div>

        {/* Footer rule strip */}
        <div className="rule-strip mt-28">
          <span className="rule-label">— {config ? t(config.about.title) : ''} —</span>
          <span className="rule-line" />
          <span className="rule-label">{t(ui.volume)} · {t(ui.issueLabel)} 05 / 26</span>
          <span className="rule-line" />
          <span className="rule-label text-clay">{t(ui.inSession)}</span>
        </div>
      </div>
    </section>
  );
}
