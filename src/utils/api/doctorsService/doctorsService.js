import { fetchDoctorsData as apiFetchDoctors } from "../../../api/services/doctors.js";

export const fetchDoctorsData = async () => {
  const result = await apiFetchDoctors();
  return {
    title: 'متخصصان آنی رز',
    icon: '/images/test/Group-3-min.png',
    doctors: result.data,
  };
};
