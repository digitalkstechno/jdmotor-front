'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FormData, initialFormData } from '../types/form';
import ProgressBar from './ProgressBar';
import Step1VehicleDetails from './Steps/Step1VehicalDetails';
import Step2CarSummary from './Steps/Step2CarSummary';
import Step3Legal from './Steps/Step3Legal';
import Step4CategoryRatings from './Steps/Step4CategoryRatings';
import Step5VehicleImages from './Steps/Step5VehicalImage';
import Step6Exterior from './Steps/Step6Exterior';
import Step7Engine from './Steps/Step7Engine';
import {
  createInspection,
  updateSection1,
  updateSection2,
  updateSection3,
  updateSection4,
  updateSection5,
  updateSection6,
  updateSection7,
  updateSection8,
  updateSection9,
} from '../lib/inspectionApi';

const TOTAL_PAGES = 7;

const PAGE_REQUIRED: Record<number, (keyof FormData)[]> = {
  1: ['companyName', 'carName', 'modal', 'modelMonth', 'type', 'fuelType', 'location', 'reportDate', 'Inspected_by', 'inspectionType'],
  2: ['estimateValue', 'ownershipNo', 'ownerName', 'blacklisted'],
};

export default function PDIForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inspectionId, setInspectionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = useCallback((field: keyof FormData, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      if (!prev[field]) return prev;
      const n = { ...prev }; delete n[field]; return n;
    });
  }, []);

  const validatePage = (page: number): boolean => {
    const required = PAGE_REQUIRED[page] || [];
    const newErrors: Record<string, string> = {};
    required.forEach(field => {
      const val = formData[field];
      if (!val || (typeof val === 'string' && !val.trim())) {
        newErrors[field] = `${String(field).replace(/_/g, ' ')} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── API call for current page ─────────────────────────────────────────────
  const saveCurrentPage = async (page: number): Promise<boolean> => {
    setApiError(null);
    try {
      if (page === 1) {
        if (!inspectionId) {
          // 1st vaar Step 1 thi Next: CREATE
          const newId = await createInspection(formData);
          setInspectionId(newId);
        } else {
          // User back avine Step 1 change karyo: UPDATE Section 1
          await updateSection1(inspectionId, formData);
        }
      } else if (inspectionId) {
        // Step 2-7: UPDATE respective section
        switch (page) {
          case 2: await updateSection2(inspectionId, formData); break;
          case 3: await updateSection3(inspectionId, formData); break;
          case 4: {
            await updateSection5(inspectionId, formData);
            await updateSection8(inspectionId, formData);
            break;
          }
          case 5: await updateSection6(inspectionId, formData); break;
          case 6: await updateSection7(inspectionId, formData); break;
          case 7: await updateSection4(inspectionId, formData); break;
        }
      }
      return true;
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Something went wrong. Please try again.';
      setApiError(msg);
      return false;
    }
  };

  // ─── Next button ───────────────────────────────────────────────────────────
  const nextPage = async () => {
    if (!validatePage(currentPage)) return;

    setIsLoading(true);
    const success = await saveCurrentPage(currentPage);
    setIsLoading(false);

    if (!success) return; // API fail thi toh aage na jao

    if (currentPage < TOTAL_PAGES) {
      setCurrentPage(p => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ─── Back button — sirf navigate karo, NO API call ─────────────────────────
  const prevPage = () => {
    setApiError(null);
    setCurrentPage(p => Math.max(p - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Final Submit (Step 9 Next) ────────────────────────────────────────────
  const handleSubmit = async () => {
    setIsLoading(true);
    const success = await saveCurrentPage(7);
    setIsLoading(false);

    if (success && inspectionId) {
      router.push(`/view/${inspectionId}`);
    }
  };

  // ─── Shared props ──────────────────────────────────────────────────────────
  const sharedStringProps = {
    data: formData,
    onChange: handleChange as (field: keyof FormData, value: string) => void,
    errors,
  };

  return (
    <div className="max-w-[700px] mx-auto py-6 px-4">
      {/* Header */}
      <div className="bg-white border border-b-0 border-slate-200 rounded-t-2xl px-7 py-5 flex items-center gap-3">
        <div className="flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
          <span className="text-2xl">🚗</span>
          <span className="font-black text-lg text-orange-500">Ride X</span>
          <span className="text-slate-400 text-sm font-normal">PDI Inspection Entry</span>
        </div>
      </div>

      <ProgressBar currentPage={currentPage} totalPages={TOTAL_PAGES} />

      {/* Card */}
      <div className="bg-white border border-t-0 border-slate-200 rounded-b-2xl shadow-lg overflow-hidden">
        {currentPage === 1 && <Step1VehicleDetails {...sharedStringProps} />}
        {currentPage === 2 && <Step2CarSummary data={formData} onChange={handleChange as (field: keyof FormData, value: string | File | null) => void} errors={errors} />}
        {currentPage === 3 && <Step3Legal {...sharedStringProps} />}
        {currentPage === 4 && <Step5VehicleImages data={formData} onChange={handleChange} />}
        {currentPage === 5 && <Step6Exterior data={formData} onChange={handleChange as (field: keyof FormData, value: string | Record<string, string>) => void} />}
        {currentPage === 6 && <Step7Engine data={formData} onChange={handleChange as (field: keyof FormData, value: string | Record<string, string>) => void} />}
        {currentPage === 7 && <Step4CategoryRatings data={formData} onChange={handleChange as (field: keyof FormData, value: string) => void} />}

        {/* API Error Banner */}
        {apiError && (
          <div className="mx-7 mb-4 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-xl">
            ⚠️ {apiError}
          </div>
        )}

        {/* Footer */}
        <div className="flex gap-3 px-7 py-5 border-t border-slate-200">
          {currentPage > 1 && (
            <button
              onClick={prevPage}
              disabled={isLoading}
              className="px-6 py-3 rounded-xl border-[1.5px] border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all disabled:opacity-50"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ← Back
            </button>
          )}
          {currentPage < TOTAL_PAGES ? (
            <button
              onClick={nextPage}
              disabled={isLoading}
              className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-black text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {isLoading ? 'Saving...' : 'Next →'}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 py-3 rounded-xl bg-green-600 text-white font-black text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {isLoading ? 'Saving...' : '✅ Save Entry'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}