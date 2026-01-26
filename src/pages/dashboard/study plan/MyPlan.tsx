import DashboardHeading from "@/components/reusable/DashboardHeading";
import PrimaryButton from "@/components/reusable/PrimaryButton";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import MyStudyPlanCard from "./MyStudyPlanCard";
import { useGetStudyPlanQuery } from "@/store/features/studyPlan/studyPlan.api";
import GlobalLoader2 from "@/common/GlobalLoader2";

export default function MyPlan() {
  const { data, isLoading } = useGetStudyPlanQuery({});

  const allStudyPlans = data?.data ?? [];
  console.log("data :", allStudyPlans);

  return (
    <div className="px-1 md:px-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* <Link to={"/dashboard/smart-study"} className="mb-7">
            <ArrowLeft />
          </Link> */}
          <DashboardHeading
            title="All Study Plan"
            titleSize="text-xl"
            description="A structured path to smarter learning and better results."
            className="mt-12 mb-12 space-y-1"
          />
        </div>
        <div className="flex items-center gap-6">
          {/* <Link to={"/dashboard/my-plan"}>
            <PrimaryButton
              bgType="solid"
              bgColor="bg-teal-700"
              iconPosition="left"
              icon={<Filter className="w-4 h-4" />}
              className="h-12 mb-4 hover:bg-teal-700/90 hover:opacity-80 cursor-pointer"
            >
              Filter
            </PrimaryButton>
          </Link> */}
          <Link to={"/dashboard/create-study-plan"}>
            <PrimaryButton
              bgType="solid"
              bgColor="bg-blue-btn-1"
              iconPosition="left"
              icon={<Plus className="w-4 h-4" />}
              className="h-12 mb-4 hover:bg-blue-btn-1 hover:opacity-80 cursor-pointer"
            >
              Create new plan
            </PrimaryButton>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <GlobalLoader2 />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-3">
          {allStudyPlans.map(
            (plan: {
              _id: string;
              plan_summary: string;
              total_days: number;
              daily_plan: {
                day_number: number;
                date: string;
                total_hours: number;
                topics: string[];
                hourly_breakdown: {
                  task_type: string;
                  duration_hours: number;
                  suggest_content: string[];
                  isCompleted: boolean;
                }[];
              }[];
            }) => (
              <MyStudyPlanCard key={plan._id} plan={plan} />
            )
          )}
        </div>
      )}
    </div>
  );
}
