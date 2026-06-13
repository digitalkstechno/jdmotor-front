'use client';
import { FormData } from '../../types/form';


interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string | Record<string, string>) => void;
}

// const EXT_PARAMS = [
//   'Boot Floor','Pillar LHS A','Pillar LHS B','Pillar LHS C','Pillar RHS A','Pillar RHS B','Pillar RHS C',
//   'Apron LHS','Apron RHS','Apron RHS LEG','Apron LHS LEG','Firewall','Cowl Top','Upper Cross Member',
//   'Front Show','Lower Cross Member','Radiator Support','Head Light Support','Windshield Rear',
//   'Light LHS Taillight','Light LHS Fog Light','Light RHS Fog Light','ORVM LHS','Tyre / Spare Tyre',
//   'Grill','Is Car Waterlogged','Roof','Bonnet / Hood','Dicky Door / Boot Door','Quarter Panel LHS',
//   'Quarter Panel RHS','Fender LHS','Fender RHS','Running Border LHS','Running Border RHS',
//   'Door LHS Front','Door LHS Rear','Door RHS Front','Door RHS Rear','Windshield Front',
//   'Light LHS Headlight','Light RHS Headlight','Light RHS Taillight','Bumper Front','Bumper Rear',
//   'ORVM RHS','Alloy Wheel','LHS Front Tyre','LHS Rear Tyre','RHS Front Tyre','RHS Rear Tyre'
// ];
const EXT_PARAMS = [
  'Body Parts Condition', 
    "Windshield Condition",
  "Interior Condition",
  "Tyre Condition",
  "Engine Condition",
  "Suspension Condition",
  "Brake Condition",
  "Gearbox Condition",
  "Electric Condition",
  "A.C. & Heater Condition",
  "Accessories Condition"
];

export default function Step6Exterior({ data, onChange }: Props) {
  const getKey = (param: string) => 'ext_' + param.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

  const handleParam = (param: string, value: string) => {
    const updated = { ...data.ext_params, [getKey(param)]: value };
    onChange('ext_params', updated);
  };

  const handleComment = (param: string, value: string) => {
    const updated = { ...data.ext_params, [getKey(param) + '_comment']: value };
    onChange('ext_params', updated);
  };

  return (
    <div>
      <div className="bg-slate-50 border-b border-slate-200 px-7 py-5">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          🔍 Step 5 of 7
        </div>
        <h2 className="font-black text-xl text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>Exterior & Tyres Inspection</h2>
        <p className="text-sm text-slate-500 mt-0.5">Mark each part as Good or Bad</p>
      </div>

      <div className="p-7">
        {/* Params table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-500">Parameter</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase tracking-widest text-green-600 text-center w-28">Good</th>
                <th className="px-4 py-3 text-[11px] font-black uppercase tracking-widest text-red-500 text-center w-28">Bad</th>
              </tr>
            </thead>
            <tbody>
              {EXT_PARAMS.map((param, idx) => {
                const key = getKey(param);
                const val = data.ext_params[key] || '';
                return (
                  <tr key={param} className={`border-t border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'} hover:bg-blue-50/30 transition-colors`}>
                    <td className="px-4 py-2.5 text-sm text-slate-700 font-medium">
                      <div>{param}</div>
                      <input
                        type="text"
                        placeholder="Add comment..."
                        value={data.ext_params[key + '_comment'] || ''}
                        onChange={e => handleComment(param, e.target.value)}
                        className="mt-1 w-full bg-white/70 border border-slate-200 rounded-lg px-2.5 py-1 text-xs outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-100 transition-all placeholder:text-slate-400"
                      />
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <input
                        type="radio"
                        name={key}
                        value="good"
                        checked={val === 'good'}
                        onChange={() => handleParam(param, 'good')}
                        className="w-4 h-4 accent-green-600 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <input
                        type="radio"
                        name={key}
                        value="bad"
                        checked={val === 'bad'}
                        onChange={() => handleParam(param, 'bad')}
                        className="w-4 h-4 accent-red-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
