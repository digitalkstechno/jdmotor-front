"use client";
import { FormData } from "../../types/form";

interface Props {
  data: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}

const inputCls =
  "w-full bg-slate-50 border-[1.5px] border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </label>
      {children}
    </div>
  );
}

function YesNo({
  name,
  value,
  onChange,
}: {
  name: keyof FormData;
  value: string;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      className={inputCls}
    >
      <option value="">— Select —</option>
      <option>Yes</option>
      <option>No</option>
    </select>
  );
}

function SectionTitle({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className="text-[12px] font-black uppercase tracking-widest text-blue-600 border-b-2 border-slate-100 pb-2 mt-6 mb-4 flex items-center gap-2"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <span>{icon}</span>
      {children}
    </h3>
  );
}

export default function Step9OEMFeatures({ data, onChange }: Props) {
  return (
    <div>
      <div className="bg-slate-50 border-b border-slate-200 px-7 py-5">
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          🏷️ Step 9 of 9
        </div>
        <h2
          className="font-black text-xl text-slate-800"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          OEM Features & Specs
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Safety, fuel, entertainment, dimensions & comfort
        </p>
      </div>

      <div className="p-7">
        <SectionTitle icon="✨">Key Highlights</SectionTitle>
        <div className="grid grid-cols-3 gap-3 mb-2">
          {[
            {
              icon: "🪟",
              label: "Power Window",
              name: "oem_power_window",
              placeholder: "Front & rear",
              type: "text",
            },
            {
              icon: "🛡️",
              label: "Airbags",
              name: "oem_airbags_count",
              placeholder: "04",
              type: "number",
            },
            {
              icon: "💺",
              label: "Seating Capacity",
              name: "oem_seating_capacity",
              placeholder: "05",
              type: "number",
            },
          ].map((h) => (
            <div
              key={h.name}
              className="bg-blue-600 rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                {h.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-blue-200 font-bold uppercase mb-1">
                  {h.label}
                </p>
                <input
                  type={h.type}
                  value={(data as unknown as Record<string, string>)[h.name]}
                  onChange={(e) =>
                    onChange(h.name as keyof FormData, e.target.value)
                  }
                  placeholder={h.placeholder}
                  className="bg-transparent border-none outline-none text-white font-black text-sm w-full placeholder:text-blue-300"
                />
              </div>
            </div>
          ))}
        </div>

        <SectionTitle icon="🛡️">Safety</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="oem_front_fog_lights" label="Front Fog Lights">
            <YesNo
              name="oem_front_fog_lights"
              value={data.oem_front_fog_lights}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_isofix" label="ISOFIX Child Seat Anchor">
            <YesNo
              name="oem_isofix"
              value={data.oem_isofix}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_abs" label="ABS">
            <YesNo name="oem_abs" value={data.oem_abs} onChange={onChange} />
          </Field>
          <Field id="oem_central_locking" label="Central Locking">
            <input
              type="text"
              value={data.oem_central_locking}
              onChange={(e) => onChange("oem_central_locking", e.target.value)}
              placeholder="e.g. Keyless Entry"
              className={inputCls}
            />
          </Field>
          <Field id="oem_rear_defogger" label="Rear Defogger">
            <YesNo
              name="oem_rear_defogger"
              value={data.oem_rear_defogger}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_airbags_safety" label="Airbags Count">
            <input
              type="number"
              value={data.oem_airbags_safety}
              onChange={(e) => onChange("oem_airbags_safety", e.target.value)}
              placeholder="04"
              min="0"
              className={inputCls}
            />
          </Field>
        </div>

        <SectionTitle icon="⛽">Fuel & Performance</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="oem_max_power_bhp" label="Max Power (bhp)">
            <input
              type="number"
              value={data.oem_max_power_bhp}
              onChange={(e) => onChange("oem_max_power_bhp", e.target.value)}
              placeholder="81.80"
              step="0.01"
              className={inputCls}
            />
          </Field>
          <Field id="oem_max_torque_nm" label="Max Torque (Nm)">
            <input
              type="number"
              value={data.oem_max_torque_nm}
              onChange={(e) => onChange("oem_max_torque_nm", e.target.value)}
              placeholder="114.7"
              step="0.1"
              className={inputCls}
            />
          </Field>
          <Field id="oem_fuel_tank_lit" label="Fuel Tank Capacity (lit)">
            <input
              type="number"
              value={data.oem_fuel_tank_lit}
              onChange={(e) => onChange("oem_fuel_tank_lit", e.target.value)}
              placeholder="24"
              step="0.1"
              className={inputCls}
            />
          </Field>
          <Field id="oem_emission_standard" label="Emission Standard">
            <input
              type="text"
              value={data.oem_emission_standard}
              onChange={(e) =>
                onChange("oem_emission_standard", e.target.value)
              }
              placeholder="e.g. BSVI"
              className={inputCls}
            />
          </Field>
        </div>

        <SectionTitle icon="📻">Entertainment & Communication</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field id="oem_instrument_panel" label="Instrument Panel Type">
            <input
              type="text"
              value={data.oem_instrument_panel}
              onChange={(e) => onChange("oem_instrument_panel", e.target.value)}
              placeholder="Analogue & digital"
              className={inputCls}
            />
          </Field>
          <Field id="oem_360_camera" label="360 Degree Camera">
            <YesNo
              name="oem_360_camera"
              value={data.oem_360_camera}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_speaker_brand" label="Speaker Brand">
            <input
              type="text"
              value={data.oem_speaker_brand}
              onChange={(e) => onChange("oem_speaker_brand", e.target.value)}
              placeholder="e.g. JBL"
              className={inputCls}
            />
          </Field>
          <Field id="oem_no_of_speakers" label="No. of Speakers">
            <input
              type="number"
              value={data.oem_no_of_speakers}
              onChange={(e) => onChange("oem_no_of_speakers", e.target.value)}
              placeholder="04"
              className={inputCls}
            />
          </Field>
          <Field id="oem_infotainment" label="Infotainment System">
            <input
              type="text"
              value={data.oem_infotainment}
              onChange={(e) => onChange("oem_infotainment", e.target.value)}
              placeholder="e.g. Touch Screen"
              className={inputCls}
            />
          </Field>
          <Field id="oem_gps" label="GPS">
            <YesNo name="oem_gps" value={data.oem_gps} onChange={onChange} />
          </Field>
          <Field id="oem_steering_audio_ctrl" label="Steering Audio Controls">
            <YesNo
              name="oem_steering_audio_ctrl"
              value={data.oem_steering_audio_ctrl}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_smart_connectivity" label="Smart Connectivity">
            <input
              type="text"
              value={data.oem_smart_connectivity}
              onChange={(e) =>
                onChange("oem_smart_connectivity", e.target.value)
              }
              placeholder="e.g. Android Auto"
              className={inputCls}
            />
          </Field>
          <Field id="oem_display_screen_size" label="Display Screen Size (in)">
            <input
              type="text"
              value={data.oem_display_screen_size}
              onChange={(e) =>
                onChange("oem_display_screen_size", e.target.value)
              }
              placeholder="08 in"
              className={inputCls}
            />
          </Field>
          <Field
            id="oem_multi_display_size"
            label="Multi-function Display (in)"
          >
            <input
              type="text"
              value={data.oem_multi_display_size}
              onChange={(e) =>
                onChange("oem_multi_display_size", e.target.value)
              }
              placeholder="08 in"
              className={inputCls}
            />
          </Field>
        </div>

        <SectionTitle icon="📐">Dimensions & Capacity</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="oem_body_type" label="Body Type">
            <input
              type="text"
              value={data.oem_body_type}
              onChange={(e) => onChange("oem_body_type", e.target.value)}
              placeholder="e.g. Sedan"
              className={inputCls}
            />
          </Field>
          <Field id="oem_seating_rows" label="No. of Seating Rows">
            <input
              type="text"
              value={data.oem_seating_rows}
              onChange={(e) => onChange("oem_seating_rows", e.target.value)}
              placeholder="e.g. 2"
              className={inputCls}
            />
          </Field>
          <Field id="oem_bootspace_lit" label="Bootspace (litres)">
            <input
              type="number"
              value={data.oem_bootspace_lit}
              onChange={(e) => onChange("oem_bootspace_lit", e.target.value)}
              placeholder="480"
              className={inputCls}
            />
          </Field>
          <Field id="oem_width_mm" label="Width (mm)">
            <input
              type="number"
              value={data.oem_width_mm}
              onChange={(e) => onChange("oem_width_mm", e.target.value)}
              placeholder="1729"
              className={inputCls}
            />
          </Field>
        </div>

        <SectionTitle icon="⚙️">Engine, Transmission & Brakes</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              name: "oem_gearbox_gears",
              label: "Gearbox – No. of Gears",
              placeholder: "04",
              type: "number",
            },
            {
              name: "oem_displacement_cc",
              label: "Displacement (cc)",
              placeholder: "1800",
              type: "number",
            },
            {
              name: "oem_transmission_type",
              label: "Transmission Type",
              placeholder: "e.g. Manual",
              type: "text",
            },
            {
              name: "oem_cylinders",
              label: "Cylinders",
              placeholder: "02",
              type: "number",
            },
            {
              name: "oem_brake_rear",
              label: "Brake Type (Rear)",
              placeholder: "e.g. Drum",
              type: "text",
            },
            {
              name: "oem_brake_front",
              label: "Brake Type (Front)",
              placeholder: "e.g. Drum",
              type: "text",
            },
            {
              name: "oem_disc_brakes",
              label: "No. of Disc Brakes",
              placeholder: "02",
              type: "number",
            },
          ].map((f) => (
            <Field key={f.name} id={f.name} label={f.label}>
              <input
                type={f.type}
                value={(data as unknown as Record<string, string>)[f.name]}
                onChange={(e) =>
                  onChange(f.name as keyof FormData, e.target.value)
                }
                placeholder={f.placeholder}
                className={inputCls}
              />
            </Field>
          ))}
        </div>

        <SectionTitle icon="🪑">Comfort & Convenience</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="oem_seat_upholstery" label="Seat Upholstery">
            <input
              type="text"
              value={data.oem_seat_upholstery}
              onChange={(e) => onChange("oem_seat_upholstery", e.target.value)}
              placeholder="e.g. Leather"
              className={inputCls}
            />
          </Field>
          <Field id="oem_auto_climate" label="Auto Climate Control">
            <YesNo
              name="oem_auto_climate"
              value={data.oem_auto_climate}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_wireless_charging" label="Wireless Charging Pad">
            <YesNo
              name="oem_wireless_charging"
              value={data.oem_wireless_charging}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_steering_material" label="Steering Wheel Material">
            <input
              type="text"
              value={data.oem_steering_material}
              onChange={(e) =>
                onChange("oem_steering_material", e.target.value)
              }
              placeholder="e.g. Alloy & Synthetic Leather"
              className={inputCls}
            />
          </Field>
          <Field id="oem_smart_key" label="Smart Card/Smart Key">
            <YesNo
              name="oem_smart_key"
              value={data.oem_smart_key}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_top_model" label="Top Model">
            <YesNo
              name="oem_top_model"
              value={data.oem_top_model}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_parking_sensors" label="Parking Sensors">
            <YesNo
              name="oem_parking_sensors"
              value={data.oem_parking_sensors}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_rear_ac" label="Rear AC">
            <YesNo
              name="oem_rear_ac"
              value={data.oem_rear_ac}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_power_windows_pos" label="Power Windows">
            <input
              type="text"
              value={data.oem_power_windows_pos}
              onChange={(e) =>
                onChange("oem_power_windows_pos", e.target.value)
              }
              placeholder="e.g. Front & rear"
              className={inputCls}
            />
          </Field>
          <Field id="oem_steering_adjust" label="Steering Adjustment">
            <input
              type="text"
              value={data.oem_steering_adjust}
              onChange={(e) => onChange("oem_steering_adjust", e.target.value)}
              placeholder="e.g. Tilt & telescope"
              className={inputCls}
            />
          </Field>
          <Field id="oem_driver_seat_adjust" label="Driver Seat Adjustment">
            <input
              type="text"
              value={data.oem_driver_seat_adjust}
              onChange={(e) =>
                onChange("oem_driver_seat_adjust", e.target.value)
              }
              placeholder="e.g. Manual"
              className={inputCls}
            />
          </Field>
          <Field id="oem_cruise_control" label="Cruise Control">
            <YesNo
              name="oem_cruise_control"
              value={data.oem_cruise_control}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_air_conditioner" label="Air Conditioner">
            <YesNo
              name="oem_air_conditioner"
              value={data.oem_air_conditioner}
              onChange={onChange}
            />
          </Field>
          <Field id="oem_push_button_start" label="Push Button Start">
            <YesNo
              name="oem_push_button_start"
              value={data.oem_push_button_start}
              onChange={onChange}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}
