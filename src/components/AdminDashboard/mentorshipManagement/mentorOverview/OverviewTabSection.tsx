import { useState } from "react";
import Tabs from "../../reuseable/Tabs";
import CommonSpace from "@/common/space/CommonSpace";
import ProgressTracking from "./progress/ProgressTracking";
import Session from "./session/Session";
import MentorOverviewTable from "./overview/MentorOverviewTable";
import { overviewTableData } from "./overview/data";
import FeedbackTable from "./feedback/FeedbackTable";
import { feedbackTableData } from "./feedback/data";

const tabs = [
  { label: "Mentors Overview", value: "overview" },
  { label: "Progress Tracking", value: "progress" },
  { label: "Feedback & Evolution", value: "feedback" },
  { label: "Session Configuration", value: "session" },
];
const OverviewTabSection = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <CommonSpace>
        {activeTab === "overview" && (
          <MentorOverviewTable overview={overviewTableData} />
        )}
        {activeTab === "progress" && <ProgressTracking />}
        {activeTab === "feedback" && (
          <FeedbackTable feedback={feedbackTableData} />
        )}
        {activeTab === "session" && <Session />}
      </CommonSpace>
    </div>
  );
};

export default OverviewTabSection;
