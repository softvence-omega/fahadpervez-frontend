import React from "react";

interface ActivityItem {
  name: string;
  questions: number;
  topic?: "Questions" | "Flashcards";
  subject: string;
  author: string;
  timeAgo: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="flex flex-col w-full rounded-lg border border-slate-300 bg-white overflow-x-auto">
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-lg font-semibold text-gray-800 px-6 py-4">Recent Activity</h3>

        <ul className="flex flex-col w-full">
          {activities.map((activity, idx) => (
            <li
              key={idx}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 px-4 sm:px-6 py-3 border-b border-slate-300 w-full min-w-[280px]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 w-full sm:w-auto">
                <p className="text-black font-sans text-base font-normal leading-6 break-words">
                  {activity.name}
                </p>
                <p className="text-black font-sans text-xs font-normal leading-4 break-words">
                  {activity.questions} {activity.topic} · {activity.subject} · {activity.author}
                </p>
              </div>

              <span className="text-xs text-gray-400 sm:ml-auto">{activity.timeAgo}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;
