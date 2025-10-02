import { useState } from "react";
import Tabs from "../reuseable/Tabs";
import CommonSpace from "@/common/space/CommonSpace";
import UpcomingEvent from "./UpcomingEvent";
import AllEvent from "./AllEvent";
import { AllEventData, allEvents } from "./Data";
const tabs = [
  { label: "Overview", value: "overview" },
  { label: "All Events", value: "all" },
];
const EventTable = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [event, setEvent] = useState<AllEventData[]>(allEvents);
  const eventDelete = (subscription: AllEventData) => {
    setEvent((prev) => prev.filter((p) => p.id !== subscription.id));
  };

  return (
    <div>
      <div>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>
      <CommonSpace>
        <div>{activeTab === "overview" && <UpcomingEvent />}</div>
        <div>
          {activeTab === "all" && (
            <AllEvent events={event} onDelete={eventDelete} />
          )}
        </div>
      </CommonSpace>
    </div>
  );
};

export default EventTable;
