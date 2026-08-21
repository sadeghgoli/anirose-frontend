import data from "../../../../public/jsons/anirose-stats.json";
import AniroseStatsContent from "./AniroseStatsContent.jsx";

const AniroseStats = () => {
  const statsData = data.data;
  if (!statsData) return null;
  return <AniroseStatsContent data={statsData} />;
};

export default AniroseStats;
