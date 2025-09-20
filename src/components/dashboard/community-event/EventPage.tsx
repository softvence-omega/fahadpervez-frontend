import { Button } from "@/components/ui/button";
import CommonSkeletonLoader from "@/components/reusable/CommonSkeletonLoader";
import FeaturedEventCard from "./events-page/FeaturedEventCard";
import UpcomingEventsCard from "./events-page/UpcomingEventsCard";
import EventCalander from "./events-page/EventCalander";

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
  activeEventFilter,
  setActiveEventFilter,
  eventFilters,
  isLoading,
  getTypeColor,
}) => {
  const featuredEvent = events.find((e) => e.featured) || events[0];

  if (isLoading) {
    return <CommonSkeletonLoader />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        {/* Featured Event */}

        <div className="lg:col-span-2">
          <FeaturedEventCard
            featuredEvent={featuredEvent}
            getTypeColor={getTypeColor}
          />
        </div>

        <div className="lg:col-span-3">
          <EventCalander />
        </div>
      </div>

      {/* Event Filters */}
      <div className="flex gap-2">
        {eventFilters.map((filter) => (
          <Button
            key={filter}
            variant={activeEventFilter === filter ? "default" : "outline"}
            onClick={() => setActiveEventFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Upcoming Events */}
      <div className="bg-white px-8 py-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 md:mb-6">Upcoming Events</h2>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {events.slice(1).map((event) => (
              <UpcomingEventsCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
