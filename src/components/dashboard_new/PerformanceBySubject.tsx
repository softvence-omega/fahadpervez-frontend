import React from "react";

const demoSubjects = [
  { name: "Cardiovascular Physiology", value: 90, color: "blue" },
  { name: "Neuroanatomy", value: 86, color: "yellow" },
  { name: "Endocrinology", value: 80, color: "red" },
  { name: "Follow-up Planning", value: 60, color: "green" },
];

const PerformanceBySubject: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Subject</h3>
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
