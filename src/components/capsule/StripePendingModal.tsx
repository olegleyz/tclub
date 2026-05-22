import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function StripePendingModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-text-hover/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-bg rounded-lg max-w-md w-full p-8 shadow-xl border border-divider">
        <h3 className="font-serif text-2xl text-text-hover mb-4">
          Скоро откроется покупка
        </h3>
        <p className="text-text leading-relaxed mb-6">
          Капсула почти готова к продаже — оплатная ссылка появится в ближайшие
          дни, кнопка её подхватит автоматически.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="text-accent hover:text-accent-hover transition-colors text-sm"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}
