import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Link } from "react-router-dom";

const QuizGenerator = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardHeading
          title="AI Quiz Generator"
          titleSize="text-xl"
          titleColor="text-[#0A0A0A]"
          description="Create custom quizzes from your images and videos using AI"
          descColor="text-[#4A5565]"
          descFont="text-sm"
          className="mt-12 mb-8"
        />
        <Link to={"/dashboard/create-note"}>
          <PrimaryButton
            bgType="solid"
            iconPosition="left"
            bgColor="bg-blue-btn-1"
            className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer">

            Create Notes
          </PrimaryButton></Link>
      </div>

      <div className="bg-white">

      </div>

    </div>
  )
};

export default QuizGenerator;
