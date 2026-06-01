"use client";
import { useRef, useState,useEffect  } from "react";
import { FormData } from "../../types/form";

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: (File | null)[]) => void;
}

export default function Step5VehicleImages({ data, onChange }: Props) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace("/v1/api", "") ||
    "http://localhost:5001";
  const [previews, setPreviews] = useState<(string | null)[]>(
    Array(8)
      .fill(null)
      .map((_, i) =>
        data.vehicle_image_urls[i]
          ? `${BASE_URL}${data.vehicle_image_urls[i]}`
          : null,
      ),
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
  const newPreviews = Array(8).fill(null).map((_, i) => {
    if (data.vehicle_images[i] instanceof File) {
      return URL.createObjectURL(data.vehicle_images[i] as File);
    }
    return data.vehicle_image_urls[i] ? `${BASE_URL}${data.vehicle_image_urls[i]}` : null;
  });
  setPreviews(newPreviews);
}, []);

  const handleFile = (index: number, file: File | null) => {
    const newImages = [...data.vehicle_images];
    newImages[index] = file;
    onChange("vehicle_images", newImages);

    const newPreviews = [...previews];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews[index] = e.target?.result as string;
        setPreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    } else {
      newPreviews[index] = null;
      setPreviews([...newPreviews]);
    }
  };

  return (
    <div>
      <div className="bg-slate-50 border-b border-slate-200 px-7 py-5">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          📸 Step 5 of 9
        </div>
        <h2
          className="font-black text-xl text-slate-800"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Vehicle Images
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Upload up to 8 vehicle photos
        </p>
      </div>

      <div className="p-7">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              onClick={() => inputRefs.current[i]?.click()}
              className="relative aspect-square border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all overflow-hidden group"
            >
              {previews[i] ? (
                <>
                  <img
                    src={previews[i]!}
                    alt={`Vehicle ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Change</span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-2xl mb-1">📷</span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Image {i + 1}
                  </span>
                </>
              )}
              <input
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(i, e.target.files?.[0] || null)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 bg-slate-50 rounded-xl px-4 py-3">
          <span>💡</span>
          <span>
            Click any box to upload. Supported: JPG, PNG, WEBP. Max 5MB each.
          </span>
        </div>
      </div>
    </div>
  );
}
