'use client';
import { useRef, useState, useEffect  } from 'react';
import { FormData } from '../../types/form';


interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: unknown) => void;
}

export default function Step8OtherImages({ data, onChange }: Props) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/v1/api', '') || 'http://localhost:5001';
const [previews, setPreviews] = useState<(string | null)[]>(
  Array(25).fill(null).map((_, i) => data.other_image_urls[i] ? `${BASE_URL}${data.other_image_urls[i]}` : null)
);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
  const newPreviews = Array(25).fill(null).map((_, i) => {
    if (data.other_images[i] instanceof File) {
      return URL.createObjectURL(data.other_images[i] as File);
    }
    return data.other_image_urls[i] ? `${BASE_URL}${data.other_image_urls[i]}` : null;
  });
  setPreviews(newPreviews);
}, []);

  const handleFile = (index: number, file: File | null) => {
    const newImages = [...data.other_images];
    newImages[index] = file;
    onChange('other_images', newImages);

    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const newPreviews = [...previews];
        newPreviews[index] = e.target?.result as string;
        setPreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    } else {
      const newPreviews = [...previews];
      newPreviews[index] = null;
      setPreviews([...newPreviews]);
    }
  };

  const handleTitle = (index: number, title: string) => {
    const newTitles = [...data.other_image_titles];
    newTitles[index] = title;
    onChange('other_image_titles', newTitles);
  };

  return (
    <div>
      <div className="bg-slate-50 border-b border-slate-200 px-7 py-5">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          🖼️ Step 8 of 9
        </div>
        <h2 className="font-black text-xl text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>Other Images</h2>
        <p className="text-sm text-slate-500 mt-0.5">Upload up to 25 additional inspection photos with titles</p>
      </div>

      <div className="p-7 space-y-3">
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 hover:border-blue-200 transition-all">
            {/* Image box */}
            <div
              onClick={() => inputRefs.current[i]?.click()}
              className="relative w-20 h-16 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all overflow-hidden flex-shrink-0 group"
            >
              {previews[i] ? (
                <>
                  <img src={previews[i]!} alt={`Other ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">Change</span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-lg">📷</span>
                  <span className="text-[10px] text-slate-400">{i + 1}</span>
                </>
              )}
              <input
                ref={el => { inputRefs.current[i] = el; }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => handleFile(i, e.target.files?.[0] || null)}
              />
            </div>

            {/* Title input */}
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Title {i + 1}</label>
              <input
                type="text"
                value={data.other_image_titles[i] || ''}
                onChange={e => handleTitle(i, e.target.value)}
                placeholder="e.g. Roof damage, Engine close-up..."
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
