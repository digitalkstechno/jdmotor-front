'use client';
import { FormData } from '../../types/form';

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}

const CATEGORIES = [
  { label: 'Tyres', ratingKey: 'tyresRating', titleKey: 'tyresRatingTitle' },
  { label: 'Engine', ratingKey: 'engineRating', titleKey: 'engineRatingTitle' },
  { label: 'Steering', ratingKey: 'steeringRating', titleKey: 'steeringRatingTitle' },
  { label: 'Air Conditioning', ratingKey: 'acRating', titleKey: 'acRatingTitle' },
  { label: 'Electricals', ratingKey: 'electricalsRating', titleKey: 'electricalsRatingTitle' },
];

const RATING_TITLES = ['Excellent', 'Very Good', 'Good', 'Neutral', 'Poor'];

const CAT_ICONS: Record<string, string> = {
  'Tyres': '🔄', 'Engine': '⚙️', 'Steering': '🎯',
  'Air Conditioning': '❄️', 'Electricals': '⚡',
};

export default function Step4CategoryRatings({ data, onChange }: Props) {
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-500';
  };

  return (
    <div>
      <div className="bg-slate-50 border-b border-slate-200 px-7 py-5">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          ⭐ Step 4 of 9
        </div>
        <h2 className="font-black text-xl text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>Category Ratings</h2>
        <p className="text-sm text-slate-500 mt-0.5">Rating for each inspection category</p>
      </div>

      <div className="p-7 space-y-4">
        {CATEGORIES.map(cat => {
          const ratingVal = parseFloat((data as unknown as Record<string, string>)[cat.ratingKey] || '0');
          return (
            <div key={cat.label} className="border border-slate-200 rounded-2xl p-5 bg-white hover:border-blue-200 transition-all hover:shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                  {CAT_ICONS[cat.label]}
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{cat.label}</h3>
                  {ratingVal > 0 && ratingVal <= 5 && (
                    <p className={`text-xs font-bold ${getRatingColor(ratingVal)}`}>
                      {'★'.repeat(Math.round(ratingVal))}{'☆'.repeat(5 - Math.round(ratingVal))} {ratingVal}/5
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Rating (0–5)</label>
                  <input
                    type="number"
                    value={(data as unknown as Record<string, string>)[cat.ratingKey]}
                    onChange={e => onChange(cat.ratingKey as keyof FormData, e.target.value as string)}
                    placeholder="e.g. 4.5"
                    min="0" max="5" step="0.1"
                    className={`w-full bg-slate-50 border-[1.5px] rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all ${
                      ratingVal > 5 || ratingVal < 0 ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200'
                    }`}
                  />
                  {(ratingVal > 5 || ratingVal < 0) && (
                    <p className="text-[11px] text-red-500 font-medium">Rating must be between 0 and 5</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Rating Title</label>
                  <select
                    value={(data as unknown as Record<string, string>)[cat.titleKey]}
                    onChange={e => onChange(cat.titleKey as keyof FormData, e.target.value as string)}
                    className="w-full bg-slate-50 border-[1.5px] border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                  >
                    <option value="">— Select —</option>
                    {RATING_TITLES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
