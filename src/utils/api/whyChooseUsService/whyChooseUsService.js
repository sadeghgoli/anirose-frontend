import axios from "axios";
export const fetchWhyChooseUsData = async () => {
  const response = await axios.get("/jsons/why-choose-us-data.json");
  return response.data.data;
};
