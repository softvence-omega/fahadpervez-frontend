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
    <div className="flex w-full py-6 px-[1.625rem] flex-col items-start gap-2.5 rounded-lg border border-slate-300 bg-white">
      <div className="flex flex-col items-start gap-[1.3125rem] self-stretch">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <ul className="space-y-2 flex flex-col items-start gap-2.5 self-stretch">
        {activities.map((activity, idx) => (
          <li
            key={idx}
            className="flex p-3 bg-white h-[3.875rem] justify-between items-center self-stretch border-b-2 border-slate-300 w-full"
          >
            <div>
              <p className=" text-black font-sans text-base font-normal leading-6 self-stretch">{activity.name}</p>
              <p className="text-black font-sans text-xs font-normal leading-[1.125rem] mt-1">
                {activity.questions} {activity.topic} · {activity.subject} · {activity.author}
              </p>
            </div>
            <span className="text-xs text-gray-400">{activity.timeAgo}</span>
          </li>
        ))}
      </ul>
      </div>
      
    </div>
  );
};

export default RecentActivity;
