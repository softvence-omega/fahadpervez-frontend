import React from "react";
import { BookOpen, Clock } from "lucide-react";

const demoChallenge = {
  labels: ["Drug Card", "Pharmacology"],
  title: "Cardiac Physiology Quiz",
  reward: "+50 points & 'Anatomy Ace' badge",
  questions: 25,
  duration: "15 mins",
};

const DailyChallenge: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
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
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {demoChallenge.labels.map((label, i) => (
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
          {demoChallenge.title}
        </h5>
        <div className="text-sm text-gray-600 mb-4">{demoChallenge.reward}</div>
        <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {demoChallenge.questions} Questions
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Est. {demoChallenge.duration}
          </span>
        </div>
        <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
          <span className="text-sm">▶</span> Start Challenge
        </button>
      </div>
    </div>
  );
};

export default DailyChallenge;
