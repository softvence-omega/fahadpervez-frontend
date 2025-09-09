import AIToolSection from "@/components/Home/AIToolSection";
import HeroSection from "@/components/Home/HeroSection";
import MentorSection from "@/components/Home/MentorSection";
import StudyPlanSection from "@/components/Home/StudyPlanSection";

const Home = () => {

  return (
    <div className="bg-white">
      <HeroSection />
      <StudyPlanSection />
      <AIToolSection />
      <MentorSection />
    </div>
  );
};
 
export default Home;
