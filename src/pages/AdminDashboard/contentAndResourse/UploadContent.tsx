import TabList from "@/components/AdminDashboard/Content & Resource_Component/Tab/TabList";
import DashboardTopSection from "@/components/AdminDashboard/reuseable/DashboardTopSection";

const UploadContent = () => {
  return (
    <>
      <DashboardTopSection
        title="Content & Resource Management"
        description="Manage MCQ banks, flashcards, quizzes, and educational resources."
      />
      <TabList />
    </>
  );
};

export default UploadContent;
