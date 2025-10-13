import React from "react";
import { BookOpen, Clock, RotateCcw } from "lucide-react";

const demoStudyPlan = [
  {
    type: "Quiz",
    labels: ["Drug Card", "Pharmacology"],
    title: "Cardiac Physiology Quiz",
    questions: 25,
    duration: "15 mins",
    buttonText: "Start quiz",
    icon: <BookOpen className="w-4 h-4" />,
    color: "bg-orange-100 text-orange-700",
  },
  {
    type: "Flashcard",
    labels: ["Immunology", "Pharmacology"],
    title: "Cardiology Flashcard",
    questions: 5,
    duration: "",
    buttonText: "Review",
    icon: <RotateCcw className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-700",
  },
];

const SmartStudyPlan: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Smart Study Plan
        </h3>
        <span className="text-sm text-gray-500">Completed</span>
      </div>

      <div className="mb-6">
        <div className="bg-gray-200 h-2 rounded-full mb-2">
          <div
            className="bg-orange-500 h-2 rounded-full"
            style={{ width: "75%" }}
          ></div>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-700">75%</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-gray-900">Today's Plan</h4>
        <button className="text-purple-600 text-sm hover:underline font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {demoStudyPlan.map((plan, i) => (
    <div
      key={i}
      className="border border-gray-200 rounded-lg p-4 flex flex-col"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {plan.labels.map((label, idx) => (
            <span
              key={idx}
              className={`${plan.color} text-nowrap px-2 py-1 rounded text-xs font-medium`}
            >
              {label}
            </span>
          ))}
        </div>
        <h5 className="font-semibold text-gray-900 mb-3">{plan.title}</h5>
        <div className="flex flex-wrap flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600 mb-4">
          {plan.duration && (
            <span className="flex items-center gap-1 text-nowrap text-sm sm:text-base">
              <Clock className="w-4 h-4" />
              Est. {plan.duration}
            </span>
          )}
          {plan.type === "Quiz" && (
            <span className="flex items-center gap-1 text-nowrap text-sm sm:text-base">
              <BookOpen className="w-4 h-4" />
              {plan.questions} Questions
            </span>
          )}
          {plan.type === "Flashcard" && (
            <span className="flex items-center gap-1 text-nowrap text-sm sm:text-base">
              <RotateCcw className="w-4 h-4" />
              {plan.questions} Flashcards
            </span>
          )}
        </div>
      </div>

      {/* Button always aligned at bottom */}
      <button className="mt-auto w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
        {plan.type === "Flashcard" ? (
          <RotateCcw className="w-4 h-4" />
        ) : (
          <span className="text-sm">▶</span>
        )}{" "}
        {plan.buttonText}
      </button>
    </div>
  ))}
</div>

    </div>
  );
};

export default SmartStudyPlan;
