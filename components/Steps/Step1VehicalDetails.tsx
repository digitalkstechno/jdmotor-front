'use client';
import { FormData } from '../../types/form';

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  errors: Record<string, string>;
}

const FUEL_TYPES = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'];

const BRAND_CARS: Record<string, string[]> = {
  'Maruti Suzuki': ['Alto', 'Swift', 'Baleno', 'Dzire', 'Ertiga', 'Brezza', 'Celerio', 'Ignis', 'S-Cross', 'Wagon R', 'XL6'],
  'Hyundai': ['i10', 'i20', 'Aura', 'Verna', 'Creta', 'Venue', 'Tucson', 'Alcazar', 'Exter'],
  'Tata Motors': ['Tiago', 'Tigor', 'Altroz', 'Nexon', 'Harrier', 'Safari', 'Punch', 'Curvv'],
  'Honda': ['Amaze', 'City', 'Jazz', 'WR-V', 'Elevate'],
  'Toyota': ['Glanza', 'Urban Cruiser', 'Innova', 'Fortuner', 'Camry', 'Hyryder'],
  'Mahindra': ['Bolero', 'Scorpio', 'XUV300', 'XUV400', 'XUV700', 'Thar', 'BE 6'],
  'Kia': ['Sonet', 'Seltos', 'Carens', 'EV6'],
  'MG': ['Hector', 'Astor', 'Gloster', 'ZS EV', 'Comet'],
  'Renault': ['Kwid', 'Triber', 'Kiger'],
  'Nissan': ['Magnite'],
  'Volkswagen': ['Polo', 'Vento', 'Taigun', 'Virtus'],
  'Skoda': ['Rapid', 'Octavia', 'Superb', 'Kushaq', 'Slavia'],
  'Ford': ['Figo', 'Aspire', 'EcoSport', 'Endeavour'],
  'Jeep': ['Compass', 'Meridian', 'Wrangler'],
  'BMW': ['3 Series', '5 Series', 'X1', 'X3', 'X5'],
  'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'GLA', 'GLC'],
  'Audi': ['A4', 'A6', 'Q3', 'Q5', 'Q7'],
};

const CAR_VARIANTS: Record<string, string[]> = {
  'Swift': ['LXI', 'VXI', 'ZXI', 'ZXI+', 'VXI AMT', 'ZXI AMT', 'ZXI+ AMT'],
  'Baleno': ['Sigma', 'Delta', 'Zeta', 'Alpha', 'Delta AMT', 'Zeta AMT', 'Alpha AMT'],
  'Dzire': ['LXI', 'VXI', 'ZXI', 'ZXI+', 'VXI AMT', 'ZXI AMT', 'ZXI+ AMT'],
  'Creta': ['E', 'EX', 'S', 'S(O)', 'SX', 'SX(O)', 'SX Tech'],
  'i20': ['Era', 'Magna', 'Sportz', 'Asta', 'Asta(O)'],
  'Nexon': ['Smart', 'Smart+', 'Pure', 'Pure+', 'Creative', 'Creative+', 'Fearless', 'Fearless+'],
  'City': ['V', 'VX', 'ZX', 'V CVT', 'VX CVT', 'ZX CVT'],
  'Seltos': ['HTE', 'HTK', 'HTK+', 'HTX', 'HTX+', 'GTX', 'GTX+'],
  'Sonet': ['HTE', 'HTK', 'HTK+', 'HTX', 'HTX+', 'GTX', 'GTX+'],
  'Hector': ['Style', 'Super', 'Smart', 'Sharp', 'Savvy'],
  'Scorpio': ['S3', 'S5', 'S7', 'S9', 'S11'],
  'XUV700': ['MX', 'AX3', 'AX5', 'AX7'],
  'Fortuner': ['2.7 4x2 MT', '2.7 4x2 AT', '2.8 4x2 MT', '2.8 4x4 MT', '2.8 4x4 AT', 'Legender'],
};

const STATES_CITIES: Record<string, string[]> = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Tirupati'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Anand', 'Mehsana'],
  'Haryana': ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Hisar', 'Rohtak', 'Karnal'],
  'Himachal Pradesh': ['Shimla', 'Manali', 'Dharamshala', 'Solan', 'Mandi'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belagavi', 'Kalaburagi'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Thane', 'Kolhapur'],
  'Manipur': ['Imphal', 'Thoubal', 'Bishnupur'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Ghaziabad', 'Noida'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Nainital'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
  'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Janakpuri', 'Laxmi Nagar', 'Saket'],
  'Jammu & Kashmir': ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla'],
  'Ladakh': ['Leh', 'Kargil'],
  'Chandigarh': ['Chandigarh'],
  'Puducherry': ['Puducherry', 'Karaikal', 'Mahe'],
  'Andaman & Nicobar Islands': ['Port Blair'],
  'Dadra & Nagar Haveli and Daman & Diu': ['Daman', 'Diu', 'Silvassa'],
  'Lakshadweep': ['Kavaratti'],
};

function Field({ id, label, required, errors, children }: { id: string; label: string; required?: boolean; errors: Record<string, string>; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      {children}
      {errors[id] && <p className="text-[11px] text-red-500 font-medium">{errors[id]}</p>}
    </div>
  );
}

export default function Step1VehicleDetails({ data, onChange, errors }: Props) {
  const inputCls = (id: string) =>
    `w-full bg-slate-50 border-[1.5px] rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none transition-all
    focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100
    ${errors[id] ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200'}`;

  return (
    <div>
      <div className="bg-slate-50 border-b border-slate-200 px-7 py-5">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          🚗 Step 1 of 9
        </div>
        <h2 className="font-black text-xl text-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>Vehicle Details</h2>
        <p className="text-sm text-slate-500 mt-0.5">Basic car and inspection information</p>
      </div>

      <div className="p-7 space-y-5">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field id="companyName" label="Company Name" required errors={errors}>
            <select id="companyName" value={data.companyName} onChange={e => { onChange('companyName', e.target.value); onChange('carName', ''); onChange('variantName', ''); }} className={inputCls('companyName')}>
              <option value="">— Select —</option>
              {Object.keys(BRAND_CARS).map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
          <Field id="carName" label="Car Name" required errors={errors}>
            <select id="carName" value={data.carName} onChange={e => { onChange('carName', e.target.value); onChange('variantName', ''); }} className={inputCls('carName')}>
              <option value="">— Select —</option>
              {(BRAND_CARS[data.companyName] || []).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field id="variantName" label="Variant" errors={errors}>
            <select id="variantName" value={data.variantName} onChange={e => onChange('variantName', e.target.value)} className={inputCls('variantName')}>
              <option value="">— Select —</option>
              {(CAR_VARIANTS[data.carName] || []).map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </Field>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field id="modal" label="Model Year" required errors={errors}>
            <input id="modal" type="number" value={data.modal} onChange={e => onChange('modal', e.target.value)} placeholder="e.g. 2025" min="1900" max="2100" className={inputCls('modal')} />
          </Field>
          <Field id="type" label="Type" required errors={errors}>
            <input id="type" type="text" value={data.type} onChange={e => onChange('type', e.target.value)} placeholder="e.g. Automatic" className={inputCls('type')} />
          </Field>
          <Field id="fuelType" label="Fuel Type" required errors={errors}>
            <select id="fuelType" value={data.fuelType} onChange={e => onChange('fuelType', e.target.value)} className={inputCls('fuelType')}>
              <option value="">— Select —</option>
              {FUEL_TYPES.map(f => <option key={f}>{f}</option>)}
            </select>
          </Field>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field id="location" label="State" required errors={errors}>
            <select id="location" value={data.location} onChange={e => { onChange('location', e.target.value); onChange('cityName', ''); }} className={inputCls('location')}>
              <option value="">— Select —</option>
              {Object.keys(STATES_CITIES).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field id="cityName" label="City" required errors={errors}>
            <select id="cityName" value={data.cityName} onChange={e => onChange('cityName', e.target.value)} className={inputCls('cityName')}>
              <option value="">— Select —</option>
              {(STATES_CITIES[data.location] || []).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field id="reportDate" label="Inspection Date" required errors={errors}>
            <input id="reportDate" type="date" value={data.reportDate} onChange={e => onChange('reportDate', e.target.value)} className={inputCls('reportDate')} />
          </Field>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 gap-4">
          <Field id="Inspected_by" label="Inspected By" required errors={errors}>
            <input id="Inspected_by" type="text" value={data.Inspected_by} onChange={e => onChange('Inspected_by', e.target.value)} placeholder="e.g. Rahul Shah" className={inputCls('Inspected_by')} />
          </Field>
        </div>
      </div>
    </div>
  );
}
