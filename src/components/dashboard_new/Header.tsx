import React from "react";
import { Target } from "lucide-react";
import PrimaryButton from "../reusable/PrimaryButton";

interface HeaderProps {
  userName: string;
  goal: string;
  dailyTarget: string;
}

const Header: React.FC<HeaderProps> = ({ userName, goal, dailyTarget }) => {
  return (
    <div className="bg-[#EFF6FF99]/60 border border-[#93C5FD66]/40 rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Good Morning, {userName}!
          </h1>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Your goal:</div>
              <div className="font-medium text-gray-900">{goal}</div>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Personalize Your Learning
            </h2>
            <p className="text-gray-600 text-sm">
              Choose your subjects, systems, and style to get tailored quizzes and notes.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-gray-600">Daily Target:</div>
              <div className="text-lg font-medium text-gray-900">{dailyTarget}</div>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#10b981"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="176"
                  strokeDashoffset="44"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-600">C</span>
              </div>
            </div>
          </div>
        <PrimaryButton>

            Set Preference
        </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
