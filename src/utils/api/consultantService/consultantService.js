import { fetchConsultantData as apiFetchConsultant, submitConsultationForm as apiSubmitForm } from "../../../api/services/consultant.js";

export const fetchConsultantData = async () => {
  const result = await apiFetchConsultant();
  return result.data;
};

export const submitConsultationForm = async (formData) => {
  return apiSubmitForm(formData);
};
