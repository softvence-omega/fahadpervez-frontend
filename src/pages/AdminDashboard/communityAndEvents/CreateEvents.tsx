import EventForm from "@/components/AdminDashboard/communityAndEvents/EventForm";
import EventTable from "@/components/AdminDashboard/communityAndEvents/EventTable";
import EventTop from "@/components/AdminDashboard/communityAndEvents/EventTop";
import { useGetEventQuery } from "@/store/features/adminDashboard/ContentResources/event/eventApi";
import { EventsOverview } from "@/store/features/adminDashboard/ContentResources/event/types/allEvent";
import { useState } from "react";

const CreateEvents = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const handleCreateEvent = () => {
    setShowCreateEvent(true);
  };

  const { data } = useGetEventQuery();

  const eventData = data?.data.events ?? [];
  const overview = data?.data.overview ?? [];
  return (
    <div>
      {showCreateEvent ? (
        <EventForm handleCancel={() => setShowCreateEvent(false)} />
      ) : (
        <div>
          <EventTop
            handleCreateEvent={handleCreateEvent}
            overview={overview as EventsOverview}
          />
          <EventTable
            eventData={eventData}
            overview={overview as EventsOverview}
          />
        </div>
      )}
    </div>
  );
};

export default CreateEvents;
