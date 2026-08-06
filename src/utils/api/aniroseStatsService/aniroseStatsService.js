import axios from "axios";
export const fetchAniroseStats = async () => {
  const response = await axios.get("/jsons/anirose-stats.json");
  return response.data.data;
};
