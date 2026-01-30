import React from "react";
import { BookOpen } from "lucide-react";
import { useGetDailyChallengeQuery } from "@/store/features/tracking/tracking.api";
import { useNavigate } from "react-router-dom";


const DailyChallenge: React.FC = () => {
  const { data: challengeResponse, isLoading, isError } = useGetDailyChallengeQuery();
  const navigate = useNavigate();

  const challenge = challengeResponse?.data;

  const handleStartChallenge = () => {
    if (challenge?._id) {
      navigate(`/dashboard/daily-challenge-quiz/${challenge._id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-48 bg-gray-100 rounded"></div>
      </div>
    );
  }


  if (isError || !challenge) {
    return null; // Or show a fallback UI
  }

  const labels = [challenge.subject, challenge.system].filter(Boolean);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Daily Challenge
          </h3>
          <p className="text-sm text-gray-600">
            We recommend this based on your recent performance
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center ml-4">
          <img
            src="/image/dashboard_new/Vector.svg"
            alt="icon"
            className="w-8 h-6"
          />
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex flex-nowrap sm:items-center justify-between mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {labels.map((label, i) => (
              <span
                key={i}
                className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-xs font-medium text-nowrap"
              >
                {label}
              </span>
            ))}
          </div>
          <span className="text-blue-600 text-sm font-medium">Reward</span>
        </div>

        <h5 className="font-semibold text-gray-900 mb-3">
          {challenge.title}
        </h5>
        <div className="text-sm text-gray-600 mb-4">+10 points</div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
          <span className="flex text-nowrap items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {challenge.mcqs?.length || 0} Questions
          </span>
          {/* <span className="flex text-nowrap items-center gap-2">
            <Clock className="w-4 h-4" />
            Est. 10 mins
          </span> */}
        </div>
        <button 
          onClick={handleStartChallenge}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-sm">▶</span> Start Challenge
        </button>
      </div>
    </div>
  );
};

export default DailyChallenge;

