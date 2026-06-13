"use client";
import { useRef, useState, useEffect  } from "react";
import { FormData } from "../../types/form";

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string | File | null) => void;
  errors: Record<string, string>;
}

const RATING_TITLES = ["Excellent", "Very Good", "Good", "Neutral", "Poor"];
const OWNERSHIP_TYPES = ["Individual", "Corporate", "Government"];
const OWNERSHIP_NO = ["1", "2", "3", "4", "5"];


function Field({
  id,
  label,
  required,
  errors,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  errors: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      {children}
      {errors[id] && (
        <p className="text-[11px] text-red-500 font-medium">{errors[id]}</p>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-[12px] font-black uppercase tracking-widest text-blue-600 border-b-2 border-slate-100 pb-2 mt-6 mb-4"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </h3>
  );
}

export default function Step2CarSummary({ data, onChange, errors }: Props) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace("/v1/api", "") ||
    "http://localhost:5001";
  const [carImgPreview, setCarImgPreview] = useState<string | null>(
    data.car_image_url ? `${BASE_URL}${data.car_image_url}` : null,
  );
  const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
    if (data.car_image instanceof File) {
      const reader = new FileReader();
      reader.onload = (ev) => setCarImgPreview(ev.target?.result as string);
      reader.readAsDataURL(data.car_image);
    } else if (data.car_image_url) {
      setCarImgPreview(`${BASE_URL}${data.car_image_url}`);
    }
  }, []);

  const handleCarImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange("car_image", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setCarImgPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const inputCls = (id: string) =>
    `w-full bg-slate-50 border-[1.5px] rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none transition-all
    focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100
    ${errors[id] ? "border-red-400 ring-2 ring-red-100" : "border-slate-200"}`;

  return (
    <div>
      <div className="bg-slate-50 border-b border-slate-200 px-7 py-5">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          📋 Step 2 of 7
        </div>
        <h2
          className="font-black text-xl text-slate-800"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Car Summary & Ownership
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Rating, odometer, ownership and fitness details
        </p>
      </div>

      <div className="p-7">
        <SectionTitle>Car Front Photo</SectionTitle>
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all min-h-[120px] relative overflow-hidden"
        >
          {carImgPreview ? (
            <img
              src={carImgPreview}
              alt="Car preview"
              className="max-h-36 rounded-xl object-contain"
            />
          ) : (
            <>
              <div className="text-3xl mb-2">🚗</div>
              <p className="text-sm text-slate-500 font-medium">
                Click to upload car main image
              </p>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCarImage}
          />
        </div>

        <SectionTitle>Rating & Odometer</SectionTitle>
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field
            id="overallRating"
            label="Overall Rating"
            required
            errors={errors}
          >
            <input
              type="number"
              value={data.overallRating}
              onChange={(e) => onChange("overallRating", e.target.value)}
              placeholder="4.2"
              min="0"
              max="5"
              step="0.1"
              className={inputCls("overallRating")}
            />
          </Field>
          <Field id="ratingTitle" label="Rating Title" required errors={errors}>
            <select
              value={data.ratingTitle}
              onChange={(e) => onChange("ratingTitle", e.target.value)}
              className={inputCls("ratingTitle")}
            >
              <option value="">— Select —</option>
              {RATING_TITLES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field
            id="odometer_km"
            label="Odometer (km)"
            required
            errors={errors}
          >
            <input
              type="number"
              value={data.odometer_km}
              onChange={(e) => onChange("odometer_km", e.target.value)}
              placeholder="72553"
              min="0"
              className={inputCls("odometer_km")}
            />
          </Field>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <Field
            id="estimateValue"
            label="Estimated Value (₹)"
            required
            errors={errors}
          >
            <input
              type="text"
              value={data.estimateValue}
              onChange={(e) => onChange("estimateValue", e.target.value)}
              placeholder="e.g. 9.5L - 10.5L"
              className={inputCls("estimateValue")}
            />
          </Field>
          <Field id="ownershipNo" label="Ownership No" required errors={errors}>
            {/* <input
              type="number"
              value={data.ownershipNo}
              onChange={(e) => onChange("ownershipNo", e.target.value)}
              placeholder="2"
              min="1"
              className={inputCls("ownershipNo")}
            /> */}
             <select
              value={data.ownershipNo}
              onChange={(e) => onChange("ownershipNo", e.target.value)}
              className={inputCls("ownershipNo")}
            >
              <option value="">— Select —</option>
              {OWNERSHIP_NO.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* <SectionTitle>Health Report Summary</SectionTitle>
        <Field
          id="healthSummary"
          label="Health Report Summary"
          required
          errors={errors}
        >
          <textarea
            value={data.healthSummary}
            onChange={(e) => onChange("healthSummary", e.target.value)}
            placeholder="Describe overall car health..."
            rows={4}
            className={`w-full bg-slate-50 border-[1.5px] rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none resize-y transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 ${errors["healthSummary"] ? "border-red-400 ring-2 ring-red-100" : "border-slate-200"}`}
          />
        </Field> */}

        <SectionTitle>Ownership & Fitness</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="ownerName" label="Owner Name" required errors={errors}>
            <input
              type="text"
              value={data.ownerName}
              onChange={(e) => onChange("ownerName", e.target.value)}
              placeholder="e.g. Raj Kumar Singh"
              className={inputCls("ownerName")}
            />
          </Field>
          <Field id="ownershipType" label="Ownership Type" errors={errors}>
            <select
              value={data.ownershipType}
              onChange={(e) => onChange("ownershipType", e.target.value)}
              className={inputCls("ownershipType")}
            >
              <option value="">— Select —</option>
              {OWNERSHIP_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field id="regDate" label="Registration Date" errors={errors}>
            <input
              type="date"
              value={data.regDate}
              onChange={(e) => onChange("regDate", e.target.value)}
              className={inputCls("regDate")}
            />
          </Field>
          <Field id="regPlace" label="Registration Place" errors={errors}>
            <input
              type="text"
              value={data.regPlace}
              onChange={(e) => onChange("regPlace", e.target.value)}
              placeholder="e.g. Noida, Uttar Pradesh"
              className={inputCls("regPlace")}
            />
          </Field>
          <Field id="fitnessValidity" label="Fitness Validity" errors={errors}>
            <input
              type="date"
              value={data.fitnessValidity}
              onChange={(e) => onChange("fitnessValidity", e.target.value)}
              className={inputCls("fitnessValidity")}
            />
          </Field>
          <Field id="puccValidity" label="PUCC Validity" errors={errors}>
            <input
              type="date"
              value={data.puccValidity}
              onChange={(e) => onChange("puccValidity", e.target.value)}
              className={inputCls("puccValidity")}
            />
          </Field>
          <Field id="rtoNocDate" label="RTO NOC Issue Date" errors={errors}>
            <input
              type="date"
              value={data.rtoNocDate}
              onChange={(e) => onChange("rtoNocDate", e.target.value)}
              className={inputCls("rtoNocDate")}
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field id="blacklisted" label="Blacklisted" required errors={errors}>
            <select
              value={data.blacklisted}
              onChange={(e) => onChange("blacklisted", e.target.value)}
              className={inputCls("blacklisted")}
            >
              <option value="">— Select —</option>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </Field>
        </div>
      </div>
    </div>
  );
}
