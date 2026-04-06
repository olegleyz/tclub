import { useLang } from '../../hooks/useLang';
import { ui } from '../../lib/ui-strings';

export default function ContactSection() {
  const { t } = useLang();

  return (
    <section className="py-20 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-text-hover mb-8 text-center">
          {t(ui.contactUs)}
        </h2>
        <form
          action="https://formspree.io/f/PLACEHOLDER"
          method="POST"
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder={t(ui.yourName)}
            required
            className="w-full px-4 py-3 bg-white border border-divider rounded-lg text-text-hover placeholder:text-text/50 focus:outline-none focus:border-accent transition-colors"
          />
          <textarea
            name="message"
            placeholder={t(ui.message)}
            rows={4}
            required
            className="w-full px-4 py-3 bg-white border border-divider rounded-lg text-text-hover placeholder:text-text/50 focus:outline-none focus:border-accent transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium"
          >
            {t(ui.send)}
          </button>
        </form>
      </div>
    </section>
  );
}
