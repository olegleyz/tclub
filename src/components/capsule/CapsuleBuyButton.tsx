import { useState } from 'react';
import type { MonthCapsule } from '../../types/month';
import StripePendingModal from './StripePendingModal';

interface Props {
  capsule: MonthCapsule;
  size?: 'sm' | 'md' | 'lg';
}

export default function CapsuleBuyButton({ capsule, size = 'md' }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!capsule.stripeLink) {
      e.preventDefault();
      setModalOpen(true);
    }
  };

  const label = `Купить за ${capsule.price.amount} ${capsule.price.currency}`;

  const sizeClasses = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-8 py-3.5 text-lg',
  }[size];

  const baseClasses =
    'inline-block bg-accent hover:bg-accent-hover text-bg font-medium rounded-full transition-colors no-underline';

  return (
    <>
      {capsule.stripeLink ? (
        <a
          href={capsule.stripeLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${sizeClasses}`}
        >
          {label}
        </a>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className={`${baseClasses} ${sizeClasses}`}
        >
          {label}
        </button>
      )}
      <StripePendingModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
