import { fetchDoctorsData as apiFetchDoctors } from "../../../api/services/doctors.js";

export const fetchDoctorsData = async () => {
  return apiFetchDoctors();
};
