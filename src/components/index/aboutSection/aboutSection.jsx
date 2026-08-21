import data from "../../../../public/jsons/about-data.json";
import AboutSectionContent from "./AboutSectionContent.jsx";

const AboutSection = () => {
  const aboutData = data.data;
  if (!aboutData) return null;
  return <AboutSectionContent data={aboutData} />;
};

export default AboutSection;
