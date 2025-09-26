import React from "react";
import { Lightbulb } from "lucide-react";

const demoHighlights = [
  {
    title: "Question Of The Week",
    description:
      "What is the significant improvement in mobility, posture, and overall pain relief?",
    button: "Answer Now",
    img: "/image/dashboard_new/Frame1.svg",
  },
  {
    title: "Mini Case of the Week",
    description:
      "Years of combined expertise in chiropractic and physiotherapy care.",
    button: "Continue",
    img: "/image/dashboard_new/Frame.svg",
  },
  {
    title: "Students of the Week",
    description:
      "Years of combined expertise in chiropractic and physiotherapy care.",
    button: "View Profile",
    img: "/image/dashboard_new/User.svg",
  },
];

const WeeklyHighlights: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Highlights of the Week
        </h3>
        <Lightbulb className="w-6 h-6 text-blue-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoHighlights.map((highlight, i) => (
          <div
            key={i}
            className="border shadow-sm border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-start gap-4"
          >
            {/* Image */}
            {highlight.img && (
              <img
                src={highlight.img}
                alt={highlight.title}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
            )}

            {/* Content */}
            <div className="flex flex-col justify-between flex-1 h-full">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {highlight.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {highlight.description}
                </p>
              </div>

              <button className="mt-auto w-full md:w-auto bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                {highlight.button}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyHighlights;
