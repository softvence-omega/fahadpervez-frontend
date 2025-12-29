import React from "react";

const demoSubjects = [
  { name: "MCQ", value: 90, color: "blue" },
  { name: "Flashcard", value: 86, color: "yellow" },
  { name: "Clinical Case", value: 80, color: "red" },
  { name: "OSCE", value: 60, color: "green" },
];

const PerformanceBySubject: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
      <div className="space-y-4">
        {demoSubjects.map((sub, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium text-${sub.color}-600`}>{sub.name}</span>
              <span className="text-sm font-medium">{sub.value}%</span>
            </div>
            <div className={`bg-${sub.color}-100 h-2 rounded-full`}>
              <div className={`bg-${sub.color}-500 h-2 rounded-full`} style={{ width: `${sub.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceBySubject;
