import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, Calendar, Clock, MapPin, Star } from "lucide-react";

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
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <div className="flex gap-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-32" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <>
      {/* Featured Event */}
      {featuredEvent && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">Featured Event</CardTitle>
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-start gap-4">
                <Badge
                  className={`${getTypeColor(featuredEvent.type)} text-xs`}
                >
                  {featuredEvent.type}
                </Badge>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold">{featuredEvent.title}</h3>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/api/placeholder/40/40" />
                      <AvatarFallback>{featuredEvent.title.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {featuredEvent.description.split(" - ")[0]}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {featuredEvent.description.split(" - ")[1]}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {featuredEvent.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {featuredEvent.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-primary">Zoom Platform</span>
                    </div>
                    <Badge className="text-xs">Seminar</Badge>
                  </div>
                  <Card className="p-4">
                    <div className="text-sm font-medium mb-2">
                      Bonus for Attendees:
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Free PDF resources and personalized study schedule
                    </div>
                  </Card>
                </div>
              </div>
            </div>
            <Button className="w-full">
              Register Now - {featuredEvent.status}
            </Button>
          </CardContent>
        </Card>
      )}

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
              <Card
                key={event.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <Badge className={`${getTypeColor(event.type)} text-xs`}>
                      {event.type}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {event.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 p-4">
                  <h3 className="font-semibold line-clamp-2">{event.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-bold ${
                        event.status === "Free"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {event.price}
                    </span>
                    <Button variant="default" size="sm">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default EventPage;
