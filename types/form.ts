export interface FormData {
  // Page 1 - Vehicle Details
  companyName: string;
  carName: string;
  variantName: string;
  modal: string;
  type: string;
  fuelType: string;
  location: string;
  cityName: string;
  reportDate: string;
  Inspected_by: string;

  // Page 2 - Car Summary
  car_image: File | null;
  car_image_url: string;
  overallRating: string;
  ratingTitle: string;
  odometer_km: string;
  estimateValue: string;
  ownershipNo: string;
  healthSummary: string;
  ownerName: string;
  ownershipType: string;
  regDate: string;
  regPlace: string;
  fitnessValidity: string;
  puccValidity: string;
  blacklisted: string;

  // Page 3 - Legal
  rtoNocDate: string;
  partyPeshi: string;
  hypothecation: string;
  financierName: string;
  modConverted: string;
  modMigration: string;
  modAdapter: string;
  criminalCases: string;
  civilCases: string;
  roadAccidents: string;
  theftCases: string;
  compensationCases: string;
  otherCases: string;

  // Page 4 - Category Ratings
  tyresRating: string;
  tyresRatingTitle: string;
  engineRating: string;
  engineRatingTitle: string;
  steeringRating: string;
  steeringRatingTitle: string;
  acRating: string;
  acRatingTitle: string;
  electricalsRating: string;
  electricalsRatingTitle: string;

  // Page 5 - Vehicle Images
  vehicle_images: (File | null)[];
  vehicle_image_urls: string[];

  // Page 6 - Exterior params
  ext_repair_cost: string;
  ext_params: Record<string, string>;

  // Page 7 - Mechanical params
  engine_repair_cost: string;
  steering_repair_cost: string;
  totalAirbags: string;
  totalPowerWindows: string;
  eng_params: Record<string, string>;
  elec_params: Record<string, string>;
  str_params: Record<string, string>;
  ac_params: Record<string, string>;
  oth_params: Record<string, string>;

  // Page 8 - Other Images
  other_images: (File | null)[];
  other_image_titles: string[];
  other_image_urls: string[];

  // Page 9 - OEM Features
  oem_power_window: string;
  oem_airbags_count: string;
  oem_seating_capacity: string;
  oem_front_fog_lights: string;
  oem_isofix: string;
  oem_abs: string;
  oem_central_locking: string;
  oem_rear_defogger: string;
  oem_airbags_safety: string;
  oem_max_power_bhp: string;
  oem_max_torque_nm: string;
  oem_fuel_tank_lit: string;
  oem_emission_standard: string;
  oem_instrument_panel: string;
  oem_360_camera: string;
  oem_speaker_brand: string;
  oem_no_of_speakers: string;
  oem_infotainment: string;
  oem_gps: string;
  oem_steering_audio_ctrl: string;
  oem_smart_connectivity: string;
  oem_display_screen_size: string;
  oem_multi_display_size: string;
  oem_body_type: string;
  oem_seating_rows: string;
  oem_bootspace_lit: string;
  oem_width_mm: string;
  oem_gearbox_gears: string;
  oem_displacement_cc: string;
  oem_transmission_type: string;
  oem_cylinders: string;
  oem_brake_rear: string;
  oem_brake_front: string;
  oem_disc_brakes: string;
  oem_seat_upholstery: string;
  oem_auto_climate: string;
  oem_wireless_charging: string;
  oem_steering_material: string;
  oem_smart_key: string;
  oem_top_model: string;
  oem_parking_sensors: string;
  oem_rear_ac: string;
  oem_power_windows_pos: string;
  oem_steering_adjust: string;
  oem_driver_seat_adjust: string;
  oem_cruise_control: string;
  oem_air_conditioner: string;
  oem_push_button_start: string;
}

export const initialFormData: FormData = {
  companyName: "",
  carName: "",
  variantName: "",
  modal: "",
  type: "",
  fuelType: "",
  location: "",
  cityName: "",
  reportDate: new Date().toISOString().split("T")[0],
  Inspected_by: "",
  car_image: null,
  car_image_url: '',
  overallRating: "",
  ratingTitle: "",
  odometer_km: "",
  estimateValue: "",
  ownershipNo: "",
  healthSummary: "",
  ownerName: "",
  ownershipType: "",
  regDate: "",
  regPlace: "",
  fitnessValidity: "",
  puccValidity: "",
  blacklisted: "",
  rtoNocDate: "",
  partyPeshi: "",
  hypothecation: "",
  financierName: "",
  modConverted: "",
  modMigration: "",
  modAdapter: "",
  criminalCases: "",
  civilCases: "",
  roadAccidents: "",
  theftCases: "",
  compensationCases: "",
  otherCases: "",
  tyresRating: "",
  tyresRatingTitle: "",
  engineRating: "",
  engineRatingTitle: "",
  steeringRating: "",
  steeringRatingTitle: "",
  acRating: "",
  acRatingTitle: "",
  electricalsRating: "",
  electricalsRatingTitle: "",
  vehicle_images: Array(8).fill(null),
  vehicle_image_urls: Array(8).fill(''),
  ext_repair_cost: "",
  ext_params: {},
  engine_repair_cost: "",
  steering_repair_cost: "",
  totalAirbags: "",
  totalPowerWindows: "",
  eng_params: {},
  elec_params: {},
  str_params: {},
  ac_params: {},
  oth_params: {},
  other_images: Array(25).fill(null),
  other_image_titles: Array(25).fill(""),
  other_image_urls: Array(25).fill(''),
  oem_power_window: "",
  oem_airbags_count: "",
  oem_seating_capacity: "",
  oem_front_fog_lights: "",
  oem_isofix: "",
  oem_abs: "",
  oem_central_locking: "",
  oem_rear_defogger: "",
  oem_airbags_safety: "",
  oem_max_power_bhp: "",
  oem_max_torque_nm: "",
  oem_fuel_tank_lit: "",
  oem_emission_standard: "",
  oem_instrument_panel: "",
  oem_360_camera: "",
  oem_speaker_brand: "",
  oem_no_of_speakers: "",
  oem_infotainment: "",
  oem_gps: "",
  oem_steering_audio_ctrl: "",
  oem_smart_connectivity: "",
  oem_display_screen_size: "",
  oem_multi_display_size: "",
  oem_body_type: "",
  oem_seating_rows: "",
  oem_bootspace_lit: "",
  oem_width_mm: "",
  oem_gearbox_gears: "",
  oem_displacement_cc: "",
  oem_transmission_type: "",
  oem_cylinders: "",
  oem_brake_rear: "",
  oem_brake_front: "",
  oem_disc_brakes: "",
  oem_seat_upholstery: "",
  oem_auto_climate: "",
  oem_wireless_charging: "",
  oem_steering_material: "",
  oem_smart_key: "",
  oem_top_model: "",
  oem_parking_sensors: "",
  oem_rear_ac: "",
  oem_power_windows_pos: "",
  oem_steering_adjust: "",
  oem_driver_seat_adjust: "",
  oem_cruise_control: "",
  oem_air_conditioner: "",
  oem_push_button_start: "",
};
