/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  BookOpen,
  Clock,
  RotateCcw,
  FileText,
  Briefcase,
  ClipboardCheck,
} from "lucide-react";
import { useGetStudyPlanQuery } from "@/store/features/studyPlan/studyPlan.api";
import { useNavigate } from "react-router-dom";
import GlobalLoader2 from "@/common/GlobalLoader2";

const taskTypeConfig: Record<
  string,
  { icon: React.ReactNode; color: string; buttonText: string; buttonBgColor: string }
> = {
  mcqs: {
    icon: <BookOpen className="w-4 h-4" />,
    color: "bg-lime-50 border border-lime-300",
    buttonText: "Start quiz",
    buttonBgColor: "bg-lime-700/90 hover:bg-lime-800/90",
  },
  mcq: {
    icon: <BookOpen className="w-4 h-4" />,
    color: "bg-lime-50 border border-lime-300",
    buttonText: "Start quiz",
    buttonBgColor: "bg-lime-700/90 hover:bg-lime-800/90",
  },
  flashcards: {
    icon: <RotateCcw className="w-4 h-4" />,
    color: "bg-orange-50 border border-orange-300",
    buttonText: "Review",
    buttonBgColor: "bg-orange-700/90 hover:bg-orange-800/90",
  },
  flashcard: {
    icon: <RotateCcw className="w-4 h-4" />,
    color: "bg-orange-50 border border-orange-300",
    buttonText: "Review",
    buttonBgColor: "bg-orange-700/90 hover:bg-orange-800/90",
  },
  notes: {
    icon: <FileText className="w-4 h-4" />,
    color: "bg-green-50 border border-green-300",
    buttonText: "Read Notes",
    buttonBgColor: "bg-green-700/90 hover:bg-green-800/90",
  },
  "clinical cases": {
    icon: <Briefcase className="w-4 h-4" />,
    color: "bg-blue-50 border border-blue-300",
    buttonText: "View Case",
    buttonBgColor: "bg-blue-700/90 hover:bg-blue-800/90",
  },
  "clinical case": {
    icon: <Briefcase className="w-4 h-4" />,
    color: "bg-blue-50 border border-blue-300",
    buttonText: "View Case",
    buttonBgColor: "bg-blue-700/90 hover:bg-blue-800/90",
  },
  osce: {
    icon: <ClipboardCheck className="w-4 h-4" />,
    color: "bg-teal-50 border border-teal-300",
    buttonText: "Practice",
    buttonBgColor: "bg-teal-700/90 hover:bg-teal-800/90",
  },
};

const SmartStudyPlan: React.FC = () => {
  const { data, isLoading } = useGetStudyPlanQuery({});
  const navigate = useNavigate();

  const allStudyPlans = data?.data ?? [];

  // Logic to find today's or nearest upcoming plan
  const todayStr = new Date().toISOString().split("T")[0];

  let todayTasks: any[] = [];
  // let currentPlanSummary = "Your Plan";
  // let currentPlanId = "";

  if (allStudyPlans.length > 0) {
    // Try to find a plan that has today's date in daily_plan
    const activePlan =
      allStudyPlans.find((plan: any) =>
        plan.daily_plan.some(
          (d: any) => d.date && d.date.split("T")[0] === todayStr,
        ),
      ) || allStudyPlans[0]; // Fallback to the first (most recent) plan

    // currentPlanSummary = activePlan.plan_summary;
    // currentPlanId = activePlan._id;

    const dailyPlanEntry =
      activePlan.daily_plan.find(
        (d: any) => d.date && d.date.split("T")[0] === todayStr,
      ) || activePlan.daily_plan[0]; // Fallback to day 1 if today not found

    todayTasks = dailyPlanEntry?.hourly_breakdown || [];
    // console.log("dailyPlanEntry :", dailyPlanEntry);
  }
  const handleStartClick = (task: any) => {
    const contentId = task.suggest_content?.contentId;
    const taskType = task.task_type.toLowerCase();

    if (taskType === "mcqs" || taskType === "mcq") {
      navigate(`/dashboard/practice-mcq/${contentId}`);
    } else if (taskType === "flashcards" || taskType === "flashcard") {
      navigate(`/dashboard/solve-flash-card/${contentId}`);
    } else if (
      taskType === "clinical case" ||
      taskType === "clinical_case" ||
      taskType === "clinical cases"
    ) {
      navigate(`/dashboard/clinical-case/${contentId}`);
    } else if (taskType === "osce") {
      navigate(`/dashboard/practice-with-checklist/${contentId}`);
    } else if (taskType === "notes") {
      // Assuming notes might navigate to a specific note page
      navigate(`/dashboard/notes/${contentId}`);
    }
  };

  if (isLoading)
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-lg shadow-sm">
        <GlobalLoader2 />
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Smart Study Plan
        </h3>
        {/* <span className="text-sm text-gray-500">Completed</span> */}
      </div>

      {/* <div className="mb-6">
        <div className="bg-gray-200 h-2 rounded-full mb-2">
          <div
            className="bg-orange-500 h-2 rounded-full"
            style={{ width: "0%" }} // Progress tracking could be added later
          ></div>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-700">0%</span>
        </div>
      </div> */}

      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="font-medium text-gray-900">Today's Plan</h4>
          {/* <p
            className="text-xs text-gray-500 truncate max-w-[200px]"
            title={currentPlanSummary}
          >
            {currentPlanSummary}
          </p> */}
        </div>
        {/* {todayTasks.length > 0 && (
          <Link
            to={`/dashboard/weekly-plan/${currentPlanId}`}
            className="text-purple-600 text-sm hover:underline font-medium"
          >
            View All
          </Link>
        )} */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {todayTasks.length > 0 ? (
          todayTasks
            // .slice(0, 2)
            .map((task, i) => {
              const config = taskTypeConfig[task.task_type.toLowerCase()] || {
                icon: <BookOpen className="w-4 h-4" />,
                color: "bg-gray-100 text-gray-700",
                buttonText: "Start",
              };

              return (
                <div
                  key={i}
                  className={`${config.color} rounded-lg p-4 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`border border-gray-200 bg-white/40 text-nowrap px-2 py-1 rounded text-xs font-medium`}
                      >
                        {task.task_type}
                      </span>
                    </div>
                    <h5
                      className="font-semibold text-black/80 mb-3 line-clamp-2"
                      title={task.description || task.task_type}
                    >
                      {task.description || task.task_type}
                    </h5>
                    <div className="flex flex-wrap flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1 text-nowrap text-sm">
                        <Clock className="w-4 h-4" />
                        {task.duration_hours}h
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartClick(task)}
                    className={`mt-auto w-full ${config.buttonBgColor} text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer`}
                  >
                    {config.icon}
                    <span className="text-sm">{config.buttonText}</span>
                  </button>
                </div>
              );
            })
        ) : (
          <div className="text-center py-10 text-gray-500">
            No tasks scheduled for today.
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartStudyPlan;
