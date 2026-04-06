import { useState } from 'react';
import type { Month, LocalizedString, MonthSection, MonthIndex } from '../../types/month';
import { useLang } from '../../hooks/useLang';
import { adminUi } from '../../lib/admin-strings';
import { getFile, putFile, uploadImage } from '../../lib/github';
import LocalizedInput from './LocalizedInput';

const emptyLocalized = (): LocalizedString => ({ ru: '', en: '', uk: '' });

const emptySection = (): MonthSection => ({
  title: emptyLocalized(),
  description: emptyLocalized(),
});

interface Props {
  token: string;
  existing?: Month;
  onDone: () => void;
}

export default function MonthEditor({ token, existing, onDone }: Props) {
  const { t } = useLang();

  const now = new Date();
  const [year, setYear] = useState(existing?.year ?? now.getFullYear());
  const [month, setMonth] = useState(existing?.month ?? now.getMonth() + 1);
  const [themeTitle, setThemeTitle] = useState<LocalizedString>(existing?.theme.title ?? emptyLocalized());
  const [themeDesc, setThemeDesc] = useState<LocalizedString>(existing?.theme.description ?? emptyLocalized());
  const [sections, setSections] = useState<MonthSection[]>(existing?.sections ?? [emptySection()]);
  const [guestName, setGuestName] = useState<LocalizedString>(existing?.guest.name ?? emptyLocalized());
  const [guestRole, setGuestRole] = useState<LocalizedString>(existing?.guest.role ?? emptyLocalized());
  const [guestBio, setGuestBio] = useState<LocalizedString>(existing?.guest.bio ?? emptyLocalized());
  const [guestImageFile, setGuestImageFile] = useState<File | null>(null);
  const [guestImagePath] = useState(existing?.guest.image ?? '');
  const [closingMessage, setClosingMessage] = useState<LocalizedString>(existing?.closingMessage ?? emptyLocalized());
  const [setAsCurrent, setSetAsCurrent] = useState(!existing);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const monthId = `${year}-${String(month).padStart(2, '0')}`;

  const addSection = () => setSections([...sections, emptySection()]);
  const removeSection = (i: number) => setSections(sections.filter((_, idx) => idx !== i));
  const updateSection = (i: number, field: 'title' | 'description', value: LocalizedString) => {
    const updated = [...sections];
    updated[i] = { ...updated[i], [field]: value };
    setSections(updated);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setGuestImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setErrorMsg('');

    try {
      let imagePath = guestImagePath;

      // Upload guest image if new
      if (guestImageFile) {
        const reader = new FileReader();
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
          };
          reader.readAsDataURL(guestImageFile);
        });

        const ext = guestImageFile.name.split('.').pop() || 'jpeg';
        imagePath = `/images/guests/${monthId}-guest.${ext}`;
        await uploadImage(
          token,
          `public${imagePath}`,
          base64,
          `Add guest image for ${monthId}`,
        );
      }

      // Build month data
      const monthData: Month = {
        id: monthId,
        year,
        month,
        theme: { title: themeTitle, description: themeDesc },
        sections,
        guest: {
          name: guestName,
          role: guestRole,
          bio: guestBio,
          image: imagePath,
        },
        closingMessage,
        publishedAt: `${year}-${String(month).padStart(2, '0')}-01`,
      };

      // Save month JSON
      const monthPath = `content/months/${monthId}.json`;
      const existingFile = await getFile(token, monthPath);
      await putFile(
        token,
        monthPath,
        JSON.stringify(monthData, null, 2),
        existing ? `Update month ${monthId}` : `Add month ${monthId}`,
        existingFile?.sha,
      );

      // Update index
      const indexFile = await getFile(token, 'content/months/index.json');
      if (indexFile) {
        const index: MonthIndex = JSON.parse(indexFile.content);
        const existingEntry = index.months.find(m => m.id === monthId);
        if (existingEntry) {
          existingEntry.theme = themeTitle;
          existingEntry.guestName = guestName;
        } else {
          index.months.push({ id: monthId, theme: themeTitle, guestName });
        }
        if (setAsCurrent) {
          index.current = monthId;
        }
        // Sort newest first
        index.months.sort((a, b) => b.id.localeCompare(a.id));
        await putFile(
          token,
          'content/months/index.json',
          JSON.stringify(index, null, 2),
          `Update month index for ${monthId}`,
          indexFile.sha,
        );
      }

      // Also update public/content copies
      const pubMonthFile = await getFile(token, `public/content/months/${monthId}.json`);
      await putFile(
        token,
        `public/content/months/${monthId}.json`,
        JSON.stringify(monthData, null, 2),
        `Update public month ${monthId}`,
        pubMonthFile?.sha,
      );

      const pubIndexFile = await getFile(token, 'public/content/months/index.json');
      if (pubIndexFile && indexFile) {
        // Re-read since we just updated it
        const updatedIndex = await getFile(token, 'content/months/index.json');
        if (updatedIndex) {
          await putFile(
            token,
            'public/content/months/index.json',
            updatedIndex.content,
            `Update public month index for ${monthId}`,
            pubIndexFile.sha,
          );
        }
      }

      setStatus('success');
      setTimeout(onDone, 1500);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <h3 className="text-xl text-text-hover font-medium">
        {existing ? t(adminUi.editMonth) : t(adminUi.addMonth)}
      </h3>

      {/* Year & Month */}
      <div className="flex gap-4">
        <div>
          <label className="text-text-hover text-sm font-medium block mb-1">{t(adminUi.year)}</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-24 px-3 py-2 bg-bg border border-white/10 rounded text-text-hover focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-text-hover text-sm font-medium block mb-1">{t(adminUi.month)}</label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="px-3 py-2 bg-bg border border-white/10 rounded text-text-hover focus:outline-none focus:border-accent"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Theme */}
      <LocalizedInput label={t(adminUi.themeTitle)} value={themeTitle} onChange={setThemeTitle} />
      <LocalizedInput label={t(adminUi.themeDesc)} value={themeDesc} onChange={setThemeDesc} multiline />

      {/* Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-text-hover text-sm font-medium">{t(adminUi.monthStructure || adminUi.description)}</label>
          <button
            type="button"
            onClick={addSection}
            className="text-accent text-sm hover:underline"
          >
            + {t(adminUi.addSection)}
          </button>
        </div>
        {sections.map((section, i) => (
          <div key={i} className="bg-bg-card rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-accent text-sm">#{i + 1}</span>
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(i)}
                  className="text-red-400 text-sm hover:underline"
                >
                  {t(adminUi.removeSection)}
                </button>
              )}
            </div>
            <LocalizedInput
              label={t(adminUi.sectionTitle)}
              value={section.title}
              onChange={(v) => updateSection(i, 'title', v)}
            />
            <LocalizedInput
              label={t(adminUi.sectionDesc)}
              value={section.description}
              onChange={(v) => updateSection(i, 'description', v)}
              multiline
            />
          </div>
        ))}
      </div>

      {/* Guest */}
      <div className="bg-bg-card rounded-lg p-4 space-y-3">
        <h4 className="text-text-hover font-medium">{t(adminUi.guestOfMonth || adminUi.guestName)}</h4>
        <LocalizedInput label={t(adminUi.guestName)} value={guestName} onChange={setGuestName} />
        <LocalizedInput label={t(adminUi.guestRole)} value={guestRole} onChange={setGuestRole} />
        <LocalizedInput label={t(adminUi.guestBio)} value={guestBio} onChange={setGuestBio} multiline />
        <div>
          <label className="text-text-hover text-sm font-medium block mb-1">{t(adminUi.guestImage)}</label>
          {guestImagePath && !guestImageFile && (
            <p className="text-text text-xs mb-2">Current: {guestImagePath}</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-text text-sm"
          />
        </div>
      </div>

      {/* Closing message */}
      <LocalizedInput label={t(adminUi.closingMessage)} value={closingMessage} onChange={setClosingMessage} multiline />

      {/* Set as current */}
      <label className="flex items-center gap-2 text-text text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={setAsCurrent}
          onChange={(e) => setSetAsCurrent(e.target.checked)}
          className="accent-accent"
        />
        {t(adminUi.setAsCurrent)}
      </label>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={status === 'saving'}
          className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {status === 'saving' ? t(adminUi.saving) : t(adminUi.publish)}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="px-6 py-3 border border-white/10 text-text rounded-lg hover:bg-white/5 transition-colors"
        >
          {t(adminUi.cancel)}
        </button>
      </div>

      {status === 'success' && <p className="text-green-400 text-sm">{t(adminUi.success)}</p>}
      {status === 'error' && <p className="text-red-400 text-sm">{errorMsg}</p>}
    </form>
  );
}
