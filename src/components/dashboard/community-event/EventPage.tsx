import React from "react";
import CommonSkeletonLoader from "@/components/reusable/CommonSkeletonLoader";
import FeaturedEventCard from "./events-page/FeaturedEventCard";
import UpcomingEventsCard, { IEvent } from "./events-page/UpcomingEventsCard";
import EventCalander from "./events-page/EventCalander";
import { useState } from "react";
import { useGetAllEventsQuery } from "@/store/features/event/event.api";
import GlobalLoader2 from "@/common/GlobalLoader2";

interface Event {
  id: string;
  title: string;
  type:
    | "PLAB Prep"
    | "Workshop"
    | "Conference"
    | "Telemedicine"
    | "Health Summit";
  date: string;
  time?: string;
  description: string;
  price: string;
  status: "Free" | "Paid";
  featured?: boolean;
  startTime: string;
  endTime: string;
  color: string;
}

interface EventPageProps {
  events: Event[];
  activeEventFilter: string;
  setActiveEventFilter: (filter: string) => void;
  eventFilters: string[];
  isLoading: boolean;
  getTypeColor: (type: string) => string;
}

const EventPage: React.FC<EventPageProps> = ({
  events,
  // activeEventFilter,
  // setActiveEventFilter,
  // eventFilters,
  isLoading,
  getTypeColor,
}) => {
  const { data: eventResponse, isLoading: isEventLoading } =
    useGetAllEventsQuery({});
  const allEvents = eventResponse?.data?.events || [];
  console.log("allEvents", allEvents);

  const [activeEvent, setActiveEvent] = useState("all"); // "all" or "my"
  const featuredEvent = events.find((e) => e.featured) || events[0];

  if (isLoading) {
    return <CommonSkeletonLoader />;
  }

  return (
    <>
      <div className="flex gap-2 mb-4">
        <button
          className={`
      px-4 py-2 border rounded-md transition-transform duration-200 cursor-pointer
      ${
        activeEvent === "all"
          ? "border-blue-500 text-blue-500"
          : "border-gray-300 text-gray-700"
      }
      hover:scale-106
    `}
          onClick={() => setActiveEvent("all")}
        >
          All Events
        </button>

        <button
          className={`
      px-4 py-2 border rounded-md transition-transform duration-200 cursor-pointer
      ${
        activeEvent === "my"
          ? "border-blue-500 text-blue-500"
          : "border-gray-300 text-gray-700"
      }
      hover:scale-106
    `}
          onClick={() => setActiveEvent("my")}
        >
          My Events
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-10 mb-6 ">
        {activeEvent === "all" && (
          <div className="">
            <FeaturedEventCard
              featuredEvent={featuredEvent}
              getTypeColor={getTypeColor}
            />
          </div>
        )}

        {activeEvent === "my" && (
          <div className="lg:col-span-3">
            <EventCalander />
          </div>
        )}
      </div>

      <div className="w-full mb-6 h-[7.75rem] md:h-32 rounded-lg flex flex-col justify-center px-8 border border-gray-200 bg-white">
        <h2 className="font-semibold text-2xl text-black/100 mb-2">
          Medical Events Calendar
        </h2>
        <p className="text-black/60">
          Stay updated with webinars, workshops, and conferences
        </p>
      </div>

      {/* Event Filters */}
      {/* <div className="flex gap-2">
        {eventFilters.map((filter) => (
          <Button
            key={filter}
            variant={activeEventFilter === filter ? "default" : "outline"}
            onClick={() => setActiveEventFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div> */}

      {/* Upcoming Events */}
      {/* <div className="bg-white px-8 py-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 md:mb-6">Upcoming Events</h2> */}

      <div>
        {isEventLoading ? (
          <GlobalLoader2 />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allEvents.slice(1).map((event: IEvent) => (
              <UpcomingEventsCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default EventPage;
