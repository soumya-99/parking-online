import { BASE_URL } from "./config";

export const ADDRESSES = {
  LOGIN: `${BASE_URL}/auth/login`,
  VEHICLES_LIST: `${BASE_URL}/vehicle/list`,
  GENERAL_SETTINGS: `${BASE_URL}/master/general_settings`,
  RECEIPT_SETTINGS: `${BASE_URL}/master/receipt_setting`,
  RATE_DETAILS_LIST: `${BASE_URL}/master/rate_dtls_list`,
  FIXED_RATE_DETAILS_LIST: `${BASE_URL}/master/fixed_rate_dtls_list`,
  GST_LIST: `${BASE_URL}/master/gst_list`,
  CAR_IN: `${BASE_URL}/car/car_in`,
  DETAILED_REPORT: `${BASE_URL}/report/detail_report`,
  SHIFTWISE_REPORT: `${BASE_URL}/report/shift_wise`,
  VEHICLE_WISE_REPORT: `${BASE_URL}/report/vehicle_wise`,
  OPERATORWISE_REPORT: `${BASE_URL}/report/operator_wise`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/change_password`,
};
