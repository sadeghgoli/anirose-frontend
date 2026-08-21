import axios from "axios";
export const fetchAboutData = async () => {
  const response = await axios.get("/jsons/about-data.json");
  return response.data.data;
};
