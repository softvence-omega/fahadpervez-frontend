import AllClinicalCases from "@/components/dashboard/clinical-case/AllClinicalCases";
import ClinicalLeaderboard from "@/components/dashboard/clinical-case/ClinicalLeaderboard";
import ClinicalProgress from "@/components/dashboard/clinical-case/ClinicalProgress";
import ClinicalRecommendation from "@/components/dashboard/clinical-case/ClinicalRecommendation";
import ClinicalWeekPlan from "@/components/dashboard/clinical-case/ClinicalWeekPlan";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Plus } from "lucide-react";

const ClinicalCaseGenerator = () => {
  return (
    <div className="my-10">
      {/* heading */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left gap-6">
        <div>
          <DashboardHeading
            title="Clinical Case Library"
            titleSize="text-xl md:text-2xl"
            titleColor="text-[#0A0A0A]"
            description="Sharpen your diagnostic skills. Ready for your next challenge?"
            descColor="text-[#4A5565]"
            descFont="text-sm"
          />
        </div>
        <PrimaryButton icon={<Plus className="w-4 h-4" />} iconPosition="left">
          Create Clinical Case
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* week plan */}
        <div>
          <ClinicalWeekPlan />
        </div>
        {/* Progress */}
        <div>
          <ClinicalProgress
            weeklyGoal={10}
            completedCases={6}
            timeSpent={15}
            badges={["Case Solver - Level 1", "Neuro Star"]}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Recommendation */}
        <div>
          <ClinicalRecommendation />
        </div>
        {/* Weekly Leaderboard */}
        <div>
          <ClinicalLeaderboard />
        </div>
      </div>

      {/* All Cases */}
      <div>
        {/* filter */}
        <div>
          <AllClinicalCases />{" "}
        </div>
        {/* cards + pagination */}
        <div></div>
      </div>
    </div>
  );
};

export default ClinicalCaseGenerator;
