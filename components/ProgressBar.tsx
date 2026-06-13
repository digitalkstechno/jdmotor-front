'use client';

const PAGE_LABELS = [
  'Part - 1', 'Car Summary', 'Legal',
  'Vehicle Images', 'Exterior & Tyres',
  'Engine & More', 'Category Ratings'
];

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function ProgressBar({ currentPage, totalPages }: Props) {
  const pct = Math.round(((currentPage - 1) / totalPages) * 100);

  return (
    <div className="bg-white border-x border-slate-200 px-7 py-4">
      <div className="flex gap-1.5 mb-2">
        {Array.from({ length: totalPages }, (_, i) => {
          const step = i + 1;
          const isDone = step < currentPage;
          const isActive = step === currentPage;
          return (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                isDone ? 'bg-green-500' : isActive ? 'bg-orange-500' : 'bg-slate-200'
              }`}
            />
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-slate-500">
          Step {currentPage} of {totalPages} — <span className="text-slate-700">{PAGE_LABELS[currentPage - 1]}</span>
        </span>
        <span className="text-xs font-black text-orange-500">{pct}%</span>
      </div>
    </div>
  );
}
