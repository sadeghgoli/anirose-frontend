import axios from "axios";
export const fetchTestimonialsData = async () => {
  const response = await axios.get("/jsons/testimonials.json");
  return response.data.data;
};
