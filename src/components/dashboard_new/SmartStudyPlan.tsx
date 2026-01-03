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
import { useNavigate, Link } from "react-router-dom";
import GlobalLoader2 from "@/common/GlobalLoader2";

const taskTypeConfig: Record<
  string,
  { icon: React.ReactNode; color: string; buttonText: string }
> = {
  mcqs: {
    icon: <BookOpen className="w-4 h-4" />,
    color: "bg-orange-100 text-orange-700",
    buttonText: "Start quiz",
  },
  mcq: {
    icon: <BookOpen className="w-4 h-4" />,
    color: "bg-orange-100 text-orange-700",
    buttonText: "Start quiz",
  },
  flashcards: {
    icon: <RotateCcw className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-700",
    buttonText: "Review",
  },
  flashcard: {
    icon: <RotateCcw className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-700",
    buttonText: "Review",
  },
  notes: {
    icon: <FileText className="w-4 h-4" />,
    color: "bg-green-100 text-green-700",
    buttonText: "Read Notes",
  },
  "clinical cases": {
    icon: <Briefcase className="w-4 h-4" />,
    color: "bg-purple-100 text-purple-700",
    buttonText: "View Case",
  },
  "clinical case": {
    icon: <Briefcase className="w-4 h-4" />,
    color: "bg-purple-100 text-purple-700",
    buttonText: "View Case",
  },
  osce: {
    icon: <ClipboardCheck className="w-4 h-4" />,
    color: "bg-teal-100 text-teal-700",
    buttonText: "Practice",
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
  let currentPlanId = "";

  if (allStudyPlans.length > 0) {
    // Try to find a plan that has today's date in daily_plan
    const activePlan =
      allStudyPlans.find((plan: any) =>
        plan.daily_plan.some(
          (d: any) => d.date && d.date.split("T")[0] === todayStr
        )
      ) || allStudyPlans[0]; // Fallback to the first (most recent) plan

    // currentPlanSummary = activePlan.plan_summary;
    // currentPlanId = activePlan._id;

    const dailyPlanEntry =
      activePlan.daily_plan.find(
        (d: any) => d.date && d.date.split("T")[0] === todayStr
      ) || activePlan.daily_plan[0]; // Fallback to day 1 if today not found

    todayTasks = dailyPlanEntry?.hourly_breakdown || [];
    // console.log("dailyPlanEntry :", dailyPlanEntry);
  }
  const handleStartClick = (task: any) => {
    const contentId = task.suggest_content;
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
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
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
        {todayTasks.length > 0 && (
          <Link
            to={`/dashboard/weekly-plan/${currentPlanId}`}
            className="text-purple-600 text-sm hover:underline font-medium"
          >
            View All
          </Link>
        )}
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
                  className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`${config.color} text-nowrap px-2 py-1 rounded text-xs font-medium`}
                      >
                        {task.task_type}
                      </span>
                    </div>
                    <h5
                      className="font-semibold text-gray-900 mb-3 line-clamp-2"
                      title={task.description}
                    >
                      {task.description}
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
                    className="mt-auto w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
