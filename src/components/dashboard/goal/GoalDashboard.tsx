import { CalendarRange, Clock, PencilLine, Target } from "lucide-react";
import { DashboardProps } from "./type";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";

// Dashboard Component
export const GoalDashboard: React.FC<DashboardProps> = ({
  goal,
  onChangeGoal,
}) => {
  const user = useSelector(selectUser);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          {getGreeting()}, {user?.profile?.firstName}
        </h1>
        <button
          onClick={onChangeGoal}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
        >
          <PencilLine className="w-4 h-4" />
          Change Your Preference
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="flex items-center gap-3">
          {/* <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"> */}
          <Target className="w-8 h-8 text-gray-500" />
          {/* </div> */}
          <div>
            <div className="text-sm text-gray-600">Your goal:</div>
            <div className="font-semibold">{goal.goalName}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"> */}
          <CalendarRange className="w-8 h-8 text-gray-500" />
          {/* </div> */}
          <div>
            <div className="text-sm text-gray-600">Time Left</div>
            <div className="font-semibold">
              {goal.daysLeft} {goal.daysLeft === 1 ? "day" : "days"} (
              {goal.remainingHours} hrs) remaining
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"> */}
          <Clock className="w-8 h-8 text-gray-500" />
          {/* </div> */}
          <div>
            <div className="text-sm text-gray-600">Daily Target</div>
            <div className="font-semibold">{goal.studyHoursPerDay} hrs</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Completion Progress
          </span>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
              <span className="text-gray-600">
                Accuracy {(goal.accuracy || 0).toFixed(2)}%
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
              <span className="text-gray-600">
                Completed {(goal.complete || 0).toFixed(2)}%
              </span>
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner border border-gray-200">
          <div className="h-full flex transition-all duration-500">
            {/* Sequential Display: Smaller metric value first, then the extra portion of the larger metric. */}
            {(goal.accuracy || 0) < (goal.complete || 0) ? (
              <>
                {/* Accuracy is smaller; show it first (Blue-600) then extra completion (Blue-400) */}
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${goal.accuracy || 0}%` }}
                  title={`Accuracy: ${(goal.accuracy || 0).toFixed(2)}%`}
                ></div>
                <div
                  className="bg-blue-400 h-full transition-all duration-500"
                  style={{
                    width: `${(goal.complete || 0) - (goal.accuracy || 0)}%`,
                  }}
                  title={`Extra Completion: ${(
                    (goal.complete || 0) - (goal.accuracy || 0)
                  ).toFixed(2)}%`}
                ></div>
              </>
            ) : (
              <>
                {/* Completion is smaller; show it first (Blue-400) then extra accuracy (Blue-600) */}
                <div
                  className="bg-blue-400 h-full transition-all duration-500"
                  style={{ width: `${goal.complete || 0}%` }}
                  title={`Completed: ${(goal.complete || 0).toFixed(2)}%`}
                ></div>
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{
                    width: `${(goal.accuracy || 0) - (goal.complete || 0)}%`,
                  }}
                  title={`Extra Accuracy: ${(
                    (goal.accuracy || 0) - (goal.complete || 0)
                  ).toFixed(2)}%`}
                ></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
