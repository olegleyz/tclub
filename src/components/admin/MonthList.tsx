import { useMonthIndex } from '../../hooks/useContent';
import { useLang } from '../../hooks/useLang';
import { adminUi } from '../../lib/admin-strings';
import { monthNames } from '../../lib/ui-strings';

interface Props {
  onEdit: (monthId: string) => void;
  onAdd: () => void;
}

export default function MonthList({ onEdit, onAdd }: Props) {
  const { t } = useLang();
  const index = useMonthIndex();

  if (!index) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg text-text-hover font-medium">{t(adminUi.months)}</h3>
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-hover transition-colors"
        >
          + {t(adminUi.addMonth)}
        </button>
      </div>
      <div className="space-y-2">
        {index.months.map((m) => {
          const [year, monthNum] = m.id.split('-');
          const monthLabel = monthNames[String(Number(monthNum))];
          return (
            <button
              key={m.id}
              onClick={() => onEdit(m.id)}
              className="w-full text-left px-4 py-3 bg-bg-card rounded-lg hover:bg-white/[0.06] transition-colors flex items-center justify-between"
            >
              <div>
                <span className="text-text-hover">
                  {monthLabel ? t(monthLabel) : monthNum} {year}
                </span>
                <span className="text-text text-sm ml-3">{t(m.theme)}</span>
              </div>
              {m.id === index.current && (
                <span className="text-accent text-xs px-2 py-0.5 border border-accent/30 rounded">
                  current
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
