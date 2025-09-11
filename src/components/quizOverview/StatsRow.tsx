import { Clock } from "lucide-react";
import { Stats } from "./type";

interface StatsRowProps {
  stats: Stats;
}

const StatsRow: React.FC<StatsRowProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 w-full">
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-purple-600 font-semibold">{stats.completed}</p>
        <p className="text-sm text-gray-600">Completed</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-green-600 font-semibold">{stats.correct}</p>
        <p className="text-sm text-gray-600">Correct</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="flex justify-center items-center">
          <Clock className="mr-1 text-blue-600" size={16} />
          {stats.timePerQuestion}
        </div>
        <p className="text-sm text-gray-600">Time per question</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="flex justify-center items-center">
          <Clock className="mr-1 text-blue-600" size={16} />
          {stats.totalTime}
        </div>
        <p className="text-sm text-gray-600">Total time spent</p>
      </div>
    </div>
  );
};

export default StatsRow;
