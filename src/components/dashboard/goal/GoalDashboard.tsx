import { CalendarRange, Clock, PencilLine, Target } from "lucide-react";
import { DashboardProps } from "./type";

// Dashboard Component
export const GoalDashboard: React.FC<DashboardProps> = ({
  goal,
  onChangeGoal,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Good Morning, Emma Harrison!</h1>
        <button
          onClick={onChangeGoal}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
        >
          <PencilLine className="w-4 h-4" />
          Change Goal
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
              {goal.daysLeft} days remaining ({goal.remainingHours} hrs)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"> */}
          <Clock className="w-8 h-8 text-gray-500" />
          {/* </div> */}
          <div>
            <div className="text-sm text-gray-600">Daily Target</div>
            <div className="font-semibold">
              {goal.studyHoursPerDay} hrs/ 5 hrs
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progress %</span>
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Accuracy {goal.accuracy || 0}%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-300 rounded-full"></span>
              Completed {goal.progressPercentage}%
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="h-full flex">
            <div
              className="bg-blue-500 h-full"
              style={{ width: `${goal.accuracy || 0}%` }}
            ></div>
            <div
              className="bg-blue-300 h-full"
              style={{ width: `${goal.progressPercentage - (goal.accuracy || 0)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
