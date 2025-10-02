import CommonHeader from "@/common/header/CommonHeader";
import MiniTitle from "@/common/header/MiniTitle";

interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
  type: "success" | "info" | "warning";
}

const activityData: ActivityItem[] = [
  {
    id: "1",
    message: "New student registration: Sarah Johnson (3rd Year Medicine)",
    timestamp: "2 minutes ago",
    type: "success",
  },
  {
    id: "2",
    message: "New MCQ bank questions added: Cardiology (25 questions)",
    timestamp: "2 minutes ago",
    type: "info",
  },
  {
    id: "3",
    message:
      "Daily Challenge completion milestone: 500 students completed Daily Challeng",
    timestamp: "2 minutes ago",
    type: "info",
  },
];

const getIndicatorColor = (type: ActivityItem["type"]) => {
  switch (type) {
    case "success":
      return "bg-green-500";
    case "info":
      return "bg-pink-500";
    case "warning":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <CommonHeader className=" mb-6">Recent Platform Activity</CommonHeader>
      <div className="space-y-6">
        {activityData.map((activity, index) => (
          <div key={activity.id} className="relative">
            <div className="flex items-start gap-4">
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getIndicatorColor(
                  activity.type
                )}`}
              />
              <div className="flex-1">
                <CommonHeader className="!text-base !text-[#1E293B]">
                  {activity.message}
                </CommonHeader>
                <MiniTitle className="!text-[#475569] mt-1">
                  {activity.timestamp}
                </MiniTitle>
              </div>
            </div>
            {index < activityData.length - 1 && (
              <div className="border-b border-gray-200 mt-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
