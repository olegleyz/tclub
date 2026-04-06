import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';

export default function ContactSection() {
  const { t } = useLang();

  return (
    <section className="py-24 px-4">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-10">
          <span className="line-ornament mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-light text-text-hover italic">
            {t(ui.contactUs)}
          </h2>
        </div>
        <form
          action="https://formspree.io/f/PLACEHOLDER"
          method="POST"
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder={t(ui.yourName)}
            required
            className="w-full px-4 py-3 bg-transparent border-b border-divider text-text-hover placeholder:text-text/40 focus:outline-none focus:border-accent transition-colors"
          />
          <textarea
            name="message"
            placeholder={t(ui.message)}
            rows={4}
            required
            className="w-full px-4 py-3 bg-transparent border-b border-divider text-text-hover placeholder:text-text/40 focus:outline-none focus:border-accent transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full px-8 py-3 border border-accent/40 text-accent hover:bg-accent hover:text-white transition-all duration-300 text-sm tracking-[0.15em] uppercase cursor-pointer"
          >
            {t(ui.send)}
          </button>
        </form>
      </div>
    </section>
  );
}
