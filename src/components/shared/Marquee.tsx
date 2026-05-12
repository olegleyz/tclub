import type { LocalizedString } from '../../types/month';
import { useLang } from '../../hooks/useLang';

interface Props {
  tags: LocalizedString;
}

export default function Marquee({ tags }: Props) {
  const { t } = useLang();
  const raw = t(tags);
  const items = raw
    .split(/\s*[·•|]\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (items.length === 0) return null;

  const loopOnce = items.concat(items);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loopOnce.map((item, i) => (
          <span key={`a-${i}`}>{item}</span>
        ))}
      </div>
      <div className="marquee-track" aria-hidden="true">
        {loopOnce.map((item, i) => (
          <span key={`b-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
