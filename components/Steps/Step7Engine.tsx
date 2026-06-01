'use client';
import { FormData } from '../../types/form';


interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string | Record<string, string>) => void;
}

const ENGINE_PARAMS = ['Engine','Engine Sound','Exhaust Smoke','Engine Permissible Blow-by','Clutch','Gear Shifting','Engine Oil Level Dipstick','Battery','Coolant','Sump','Engine Oil'];
const ELECTRICAL_PARAMS = ['4 Power Windows','Airbag Feature','Music System','Leather Seat','Sunroof','Steering Mounted Audio Control','ABS','Rear Defogger','Reverse Camera','Electrical','Interior','Parking Sensor'];
const STEERING_PARAMS = ['Steering','Suspension','Brake'];
const AC_PARAMS = ['AC Cooling','Heater','Climate Control AC'];
const OTHER_PARAMS = ['Chassis Embossing','RC Availability','Insurance Image','Duplicate Key'];

interface ParamTableProps {
  params: string[];
  prefix: string;
  paramData: Record<string, string>;
  onUpdate: (key: string, value: string) => void;
  label1?: string;
  label2?: string;
  val1?: string;
  val2?: string;
  color1?: string;
  color2?: string;
}

function ParamTable({ params, prefix, paramData, onUpdate, label1 = 'Perfect', label2 = 'Imperfect', val1 = 'perfect', val2 = 'imperfect', color1 = 'text-green-600', color2 = 'text-red-500' }: ParamTableProps) {
  const getKey = (p: string) => prefix + '_' + p.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 mb-4">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-100">
            <th className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-500">Parameter</th>
            <th className={`px-4 py-3 text-[11px] font-black uppercase tracking-widest ${color1} text-center w-28`}>{label1}</th>
            <th className={`px-4 py-3 text-[11px] font-black uppercase tracking-widest ${color2} text-center w-28`}>{label2}</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param, idx) => {
            const key = getKey(param);
            const val = paramData[key] || '';
            return (
              <tr key={param} className={`border-t border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50/30 transition-colors`}>
                <td className="px-4 py-2.5 text-sm text-slate-700 font-medium">{param}</td>
                <td className="px-4 py-2.5 text-center">
                  <input type="radio" name={key} value={val1} checked={val === val1} onChange={() => onUpdate(key, val1)} className={`w-4 h-4 cursor-pointer ${val1 === 'available' ? 'accent-blue-600' : 'accent-green-600'}`} />
                </td>
                <td className="px-4 py-2.5 text-center">
                  <input type="radio" name={key} value={val2} checked={val === val2} onChange={() => onUpdate(key, val2)} className={`w-4 h-4 cursor-pointer ${val2 === 'notavailable' ? 'accent-orange-500' : 'accent-red-500'}`} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-[12px] font-black uppercase tracking-widest text-blue-600 border-b-2 border-slate-100 pb-2 mt-6 mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>{children}</h3>
);

export default function Step7Engine({ data, onChange }: Props) {
  const updateParam = (group: 'eng_params' | 'elec_params' | 'str_params' | 'ac_params' | 'oth_params') =>
    (key: string, value: string) => {
      onChange(group, { ...data[group], [key]: value });
    };

  const inputCls = 'flex-1 bg-white border border-amber-200 rounded-lg px-3 py-2 text-sm text-slate-800 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100';

  return (
    <div>
      <div className="bg-slate-50 border-b border-slate-200 px-7 py-5">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          ⚙️ Step 7 of 9
        </div>
        <h2 className="font-black text-xl text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>Engine, Electricals & More</h2>
        <p className="text-sm text-slate-500 mt-0.5">Engine/Transmission, Electricals & Interiors, Steering/AC/Other</p>
      </div>

      <div className="p-7">
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
          <span className="text-xl">🔧</span>
          <label className="text-sm font-bold text-amber-800">Engine Repair Cost (₹)</label>
          <input type="number" value={data.engine_repair_cost} onChange={e => onChange('engine_repair_cost', e.target.value)} placeholder="e.g. 500" min="0" className={inputCls} />
        </div>

        <SectionTitle>02. Engine & Transmission</SectionTitle>
        <ParamTable params={ENGINE_PARAMS} prefix="eng" paramData={data.eng_params} onUpdate={updateParam('eng_params')} />

        <SectionTitle>03. Electricals & Interiors</SectionTitle>
        <ParamTable params={ELECTRICAL_PARAMS} prefix="elec" paramData={data.elec_params} onUpdate={updateParam('elec_params')} />

        <div className="grid grid-cols-2 gap-4 my-4">
          {[
            { key: 'totalAirbags', label: 'Total No. of Airbags', val: data.totalAirbags, placeholder: 'e.g. 2' },
            { key: 'totalPowerWindows', label: 'Total No. of Power Windows', val: data.totalPowerWindows, placeholder: 'e.g. 4' },
          ].map(f => (
            <div key={f.key} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{f.label}</label>
              <input type="number" value={f.val} onChange={e => onChange(f.key as keyof FormData, e.target.value)} placeholder={f.placeholder} min="0"
                className="w-full bg-slate-50 border-[1.5px] border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
          <span className="text-xl">🔧</span>
          <label className="text-sm font-bold text-amber-800">Steering/Susp/Brake Repair Cost (₹)</label>
          <input type="number" value={data.steering_repair_cost} onChange={e => onChange('steering_repair_cost', e.target.value)} placeholder="e.g. 4000" min="0" className={inputCls} />
        </div>

        <SectionTitle>04. Steering, Suspension & Brakes</SectionTitle>
        <ParamTable params={STEERING_PARAMS} prefix="str" paramData={data.str_params} onUpdate={updateParam('str_params')} />

        <SectionTitle>05. Air Conditioning</SectionTitle>
        <ParamTable params={AC_PARAMS} prefix="ac" paramData={data.ac_params} onUpdate={updateParam('ac_params')} />

        <SectionTitle>06. Other Details</SectionTitle>
        <ParamTable
          params={OTHER_PARAMS} prefix="oth" paramData={data.oth_params} onUpdate={updateParam('oth_params')}
          label1="Available" label2="Not Available" val1="available" val2="notavailable"
          color1="text-blue-600" color2="text-orange-500"
        />
      </div>
    </div>
  );
}
