import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommonSkeletonLoader from "@/components/reusable/CommonSkeletonLoader";
import FeaturedEventCard from "./events-page/FeaturedEventCard";
import UpcomingEventsCard from "./events-page/UpcomingEventsCard";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Featured Event */}
        {featuredEvent && (
          <FeaturedEventCard
            featuredEvent={featuredEvent}
            getTypeColor={getTypeColor}
          />
        )}
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
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {events.slice(1).map((event) => (
              <UpcomingEventsCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EventPage;
