'use client';
import { FormData } from '../../types/form';

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  errors: Record<string, string>;
}

function inputCls(id: string, errors: Record<string, string>) {
  return `w-full bg-slate-50 border-[1.5px] rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none transition-all
    focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100
    ${errors[id] ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200'}`;
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{label}</label>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[12px] font-black uppercase tracking-widest text-blue-600 border-b-2 border-slate-100 pb-2 mt-6 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>{children}</h3>
  );
}

function YesNo({ name, value, errors, onChange }: { name: keyof FormData; value: string; errors: Record<string, string>; onChange: (field: keyof FormData, value: string) => void }) {
  return (
    <select value={value} onChange={e => onChange(name, e.target.value)} className={inputCls(name as string, errors)}>
      <option value="">— Select —</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  );
}

export default function Step3Legal({ data, onChange, errors }: Props) {
  return (
    <div>
      <div className="bg-slate-50 border-b border-slate-200 px-7 py-5">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          ⚖️ Step 3 of 9
        </div>
        <h2 className="font-black text-xl text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>Transferability & Legal</h2>
        <p className="text-sm text-slate-500 mt-0.5">NOC, hypothecation, modifications and legal cases</p>
      </div>

      <div className="p-7">
        <SectionTitle>Transferability Details</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="rtoNocDate" label="RTO NOC Issue Date">
            <input type="date" value={data.rtoNocDate} onChange={e => onChange('rtoNocDate', e.target.value)} className={inputCls('rtoNocDate', errors)} />
          </Field>
          <Field id="partyPeshi" label="Party Peshi Applicability">
            <YesNo name="partyPeshi" value={data.partyPeshi} errors={errors} onChange={onChange} />
          </Field>
          <Field id="hypothecation" label="Hypothecation">
            <YesNo name="hypothecation" value={data.hypothecation} errors={errors} onChange={onChange} />
          </Field>
          <Field id="financierName" label="Financier Name">
            <input type="text" value={data.financierName} onChange={e => onChange('financierName', e.target.value)} placeholder="e.g. HDFC Bank Pvt. Ltd." className={inputCls('financierName', errors)} />
          </Field>
        </div>

        <SectionTitle>Vehicle Modification</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field id="modConverted" label="Converted (Commercial → Private)">
            <YesNo name="modConverted" value={data.modConverted} errors={errors} onChange={onChange} />
          </Field>
          <Field id="modMigration" label="Migration (Re-registered)">
            <YesNo name="modMigration" value={data.modMigration} errors={errors} onChange={onChange} />
          </Field>
          <Field id="modAdapter" label="Adapted for Special Use">
            <YesNo name="modAdapter" value={data.modAdapter} errors={errors} onChange={onChange} />
          </Field>
        </div>

        <SectionTitle>Legal History</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { id: 'criminalCases', label: 'Criminal Cases', val: data.criminalCases },
            { id: 'civilCases', label: 'Civil Cases', val: data.civilCases },
            { id: 'roadAccidents', label: 'Road Accidents', val: data.roadAccidents },
            { id: 'theftCases', label: 'Theft Cases', val: data.theftCases },
            { id: 'compensationCases', label: 'Compensation Cases', val: data.compensationCases },
            { id: 'otherCases', label: 'Other Cases', val: data.otherCases },
          ].map(f => (
            <Field key={f.id} id={f.id} label={f.label}>
              <input type="number" value={f.val} onChange={e => onChange(f.id as keyof FormData, e.target.value)} placeholder="0" min="0" className={inputCls(f.id, errors)} />
            </Field>
          ))}
        </div>
      </div>
    </div>
  );
}
