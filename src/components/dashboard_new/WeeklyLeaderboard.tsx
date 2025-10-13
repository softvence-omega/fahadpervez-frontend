import React from "react";

const demoLeaderboard = [
  { rank: 1, initials: "ZK", name: "Zainab K.", points: 950, bgColor: "bg-yellow-50", circleColor: "bg-yellow-400", textColor: "text-yellow-800" },
  { rank: 2, initials: "AM", name: "Ali M.", points: 870, bgColor: "bg-gray-50", circleColor: "bg-gray-400", textColor: "text-gray-800" },
  { rank: 3, initials: "Y", name: "You", points: 850, bgColor: "bg-blue-50", circleColor: "bg-blue-500", textColor: "text-blue-800" },
];

const WeeklyLeaderboard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Leaderboard</h3>
      <div className="space-y-3">
        {demoLeaderboard.map((user, i) => (
          <div key={i} className={`flex items-center gap-3 p-3 ${user.bgColor} rounded-lg`}>
            <div className={`w-8 h-8 ${user.circleColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
              {user.rank}
            </div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className={`font-bold ${user.textColor}`}>{user.initials}</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{user.name}</div>
              {i === 2 && <div className="text-sm text-gray-500">3rd Year</div>}
            </div>
            <div className="text-right">
              <div className={`font-bold ${i === 2 ? "text-blue-600" : "text-gray-900"}`}>{user.points} pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyLeaderboard;
