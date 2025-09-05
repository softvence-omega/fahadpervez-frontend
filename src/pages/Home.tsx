import AIToolSection from "@/components/Home/AIToolSection";
import HeroSection from "@/components/Home/HeroSection";
import MentorSection from "@/components/Home/mentorSection";
import StudyPlanSection from "@/components/Home/StudyPlanSection";

const Home = () => {

  return (
    <div className="bg-white space-y-36">
      <HeroSection />
      <StudyPlanSection />
      <AIToolSection />
      <MentorSection />
    </div>
  );
};

export default Home;
