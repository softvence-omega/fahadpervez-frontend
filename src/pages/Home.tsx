import AIToolSection from "@/components/Home/AIToolSection";
import HeroSection from "@/components/Home/HeroSection";
import MentorSection from "@/components/Home/MentorSection";
import StudyPlanSection from "@/components/Home/StudyPlanSection";
import studyPlanImage from "@/assets/home/study_plan_image.png";
import Tools from "@/components/Home/Tools";

const Home = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <Tools/>
      <StudyPlanSection
        title="Innovative AI Study plan for better Education."
        description="Every year, we change the lives of millions of students..."
        leftFeatures={[
          { text: "AI Generated Quiz" },
          { text: "MCQ Bank" },
          { text: "Downloads Notes" },
        ]}
        rightFeatures={[
          { text: "AI Create Flash Cards" },
          { text: "Case Study" },
          { text: "Medical AI" },
        ]}
        buttonText="Start Case"
        image={studyPlanImage}
      />
      <AIToolSection />
      <MentorSection />
    </div>
  );
};

export default Home;
