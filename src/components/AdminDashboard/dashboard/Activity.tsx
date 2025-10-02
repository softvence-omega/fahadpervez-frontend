import CommonSpace from "@/common/space/CommonSpace";
import DailyActivity from "./DailyActivity";
import MentorShip from "./MentorShip";
import RecentActivity from "./RecentActivity";

const Activity = () => {
  return (
    <div>
      <div className="w-full flex flex-col xl:flex-row gap-6 ">
        <DailyActivity />
        <MentorShip />
      </div>
      <CommonSpace>
        <RecentActivity />
      </CommonSpace>
    </div>
  );
};

export default Activity;
