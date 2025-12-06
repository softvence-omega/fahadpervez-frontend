import { Target } from "lucide-react";
import { EmptyStateProps } from "./type";

export const GoalEmptyState: React.FC<EmptyStateProps> = ({ onSetGoal }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h1 className="text-2xl font-semibold mb-7">
        Good Morning, Emma Harrison!
      </h1>

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <Target className="w-8 h-8 text-gray-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-[#171717] mb-1 text-center">
            No Goal Set
          </h2>
          <p className="text-gray-600 text-center">
            Create your first study goal to start tracking your
            <br />
            medical studies progress
          </p>
        </div>
        <button
          onClick={onSetGoal}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          Set your goal
        </button>
      </div>
    </div>
  );
};