import EventForm from "@/components/AdminDashboard/communityAndEvents/EventForm";
import EventTable from "@/components/AdminDashboard/communityAndEvents/EventTable";
import EventTop from "@/components/AdminDashboard/communityAndEvents/EventTop";
import { useState } from "react";

const CreateEvents = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const handleCreateEvent = () => {
    setShowCreateEvent(true);
  };
  return (
    <div>
      {showCreateEvent ? (
        <EventForm handleCancel={() => setShowCreateEvent(false)} />
      ) : (
        <div>
          <EventTop handleCreateEvent={handleCreateEvent} />
          <EventTable />
        </div>
      )}
    </div>
  );
};

export default CreateEvents;
